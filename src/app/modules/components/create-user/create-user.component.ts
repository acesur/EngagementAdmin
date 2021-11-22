import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppRoutes } from 'app/AppRoutes';
import { TranslationService, UtilitiesService } from 'app/services';
import { ReplaySubject, Subject } from 'rxjs';
import { DocumentsComponent } from '../documents/documents.component';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { FuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
    animations: FuseAnimations,
})
export class CreateUserComponent implements OnInit {
    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
    @ViewChild(DocumentsComponent)
    documentsComponent: DocumentsComponent;
    public countryControl: FormControl = new FormControl();
    protected _onDestroy = new Subject<void>();
    public filteredCountry: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    id: any = '';
    breadcrumbs = [];
    businessCategory = [];
    bankNames = [];
    merchantDetails: any;
    countryList = [];
    afterViewInit = false;
    isLoadingEmail: boolean = false;
    isLoadingContact: boolean = false;
    isLoadingIban: boolean = false;
    emailError: boolean;
    contactError: boolean;
    ibanNoError: boolean;
    defaultValue: any;

    today = new Date();

    constructor(
        private fb: FormBuilder,
        private utilitiesService: UtilitiesService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        public translationService: TranslationService,
        private _location: Location,
        private translateService: TranslateService,
        private dialog: MatDialog // private outletsService: OutletsService, // private customerService: CustomerService, // private validateInputs: ValidateInputs, // private additionalService: AdditionalService,
    ) // private settingsService: SettingsService
    {
        this.activatedRoute.params.subscribe((data) => {
            console.log(data['id']);
            this.id = data['id'];
        });
    }

    filesFront: any = [];
    filesBack: any = [];
    form: FormGroup;
    async ngOnInit(): Promise<void> {
        // this.utilitiesService.startLoader();
        this.setBreadcrumbs();
        await this.formInit();

        if (this.id) {
            await this.formInit();
        }
        this.afterViewInit = true;
    }

    tes() {
        alert('dw');
    }
    /* onFileChange(event){
        const reader = new FileReader();
        if(event.target.files && event.target.files.length){
        const[image] = event.target.files;
        reader.readAsDataURL(image);
        }
    } */

    ngAfterViewInit() {}

    async formInit() {
        this.form = this.fb.group({
            user_firstname: [
                this.merchantDetails ? this.merchantDetails.user_firstname : null,
                [Validators.required],
            ],
             user_lastname: [
                this.merchantDetails ? this.merchantDetails.user_lastname : null,
                [Validators.required],
            ],
            email: [
                this.merchantDetails ? this.merchantDetails.email : null,
                [Validators.required, Validators.email],
            ],
            contact_number: [
                this.merchantDetails ? this.merchantDetails.contact_number : null,
                [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
            ],
            ResidenceID: [
                this.merchantDetails ? this.merchantDetails.ResidenceID : null,
            ],
            city: [this.merchantDetails ? this.merchantDetails.city : null],
            region: [
                this.merchantDetails
                    ? this.merchantDetails.region : null,
            ],
            postalcode: [this.merchantDetails ? this.merchantDetails.postalcode : null],
            participants: [
                this.merchantDetails
                    ? this.merchantDetails.participants
                    : null,
                [Validators.required],
            ],
            upload_image: [
                this.merchantDetails
                    ? this.merchantDetails.upload_image
                    : null,
                [Validators.required],
            ]

        });
    }


    isEmailError() {
        return this.emailError;
    }
    isErrorContact() {
        return this.contactError;
    }
    isIBANError() {
        return this.ibanNoError;
    }

    setBreadcrumbs() {
        this.breadcrumbs = [
            {
                absolute: true,
                disabled: false,
                path: `${AppRoutes.ManageUsers}`,
                relative: false,
                name_en: 'Manage User',
                name_ar: 'التجار',
            },
            {
                absolute: true,
                disabled: true,
                path: ``,
                relative: false,
                name_en: this.id ? 'Edit' : 'Create',
                name_ar: this.id ? 'تعديل' : 'خلق',
            },
        ];
    }
    goBack() {
        this._location.back();
    }

    uploadFile(files) {
        let reader = this.utilitiesService.convertImageToBase64(files[0]);
        reader.onload = (readerEvt: any) => {
            this.form.controls.logo.setValue(readerEvt.target.result);
        };
    }

    deleteLogo() {
        this.form.controls.logo.setValue(null);
    }



    save() {
        debugger;
        if (this.form.valid && !this.contactError && !this.emailError) {
            let lengthOfDocuments = 0;
            let form = this.form.value;
            let country_id = form.country_id.id
                ? form.country_id.id
                : form.country_id;
            form.country_id = country_id;
            let documents = this.documentsComponent.form.value;
            if (
                documents &&
                documents.documents &&
                documents.documents.length
            ) {
                lengthOfDocuments = documents.documents.length;
                form.documents = documents.documents;
                form.documents.forEach((data, index) => {
                    if (!data.id) {
                        delete data.id;
                    }
                });
                let formDocuments = [
                    ...form.documents.filter((data) => data.document),
                ];
                form.documents = [...formDocuments];
            } else {
                form.documents = [];
                let error = this.translateService.instant(
                    'Documents are mandatory'
                );
                this.utilitiesService.showErrorToast(error);
            }
            if (lengthOfDocuments != form.documents.length) {
                let error = this.translateService.instant(
                    'Documents are mandatory'
                );
                this.utilitiesService.showErrorToast(error);
            } else {
                if (!this.id) {
                    try {
                        let content = this.translateService.instant(
                            'Are you sure, Do you want to save ?'
                        );
                        let heading = this.translateService.instant('Save');
                        let fromApp = false;
                        let size = this.utilitiesService.isMobileAlertModal();
                        const dialogRef = this.dialog.open(
                            AlertModalComponent,
                            {
                                data: { content, heading, fromApp },
                                maxWidth: '',
                                width: `${size.width}`,
                                height: `${size.height}`,
                            }
                        );
                        dialogRef.afterClosed().subscribe(async (resp) => {
                            // if (resp) {
                            //     let add = await this.outletsService
                            //         .addMerchants(form)
                            //         .toPromise();
                            //     if (add) {
                            //         let successmsg =
                            //             this.translateService.instant(
                            //                 'Merchant created successfully'
                            //             );
                            //         this.utilitiesService.showSuccessToast(
                            //             successmsg
                            //         );
                            //         this.route.navigate([AppRoutes.Merchants]);
                            //     }
                            // }
                        });
                    } catch {
                    } finally {
                        // this.utilitiesService.stopLoader();
                    }
                } else {
                    try {
                        let content = this.translateService.instant(
                            'Are you sure, Do you want to update ?'
                        );
                        let heading = this.translateService.instant('Update');
                        let fromApp = false;
                        let size = this.utilitiesService.isMobileAlertModal();
                        const dialogRef = this.dialog.open(
                            AlertModalComponent,
                            {
                                data: { content, heading, fromApp },
                                maxWidth: '',
                                width: `${size.width}`,
                                height: `${size.height}`,
                            }
                        );
                        dialogRef.afterClosed().subscribe(async (resp) => {
                            // if (resp) {
                            //     let add = await this.outletsService
                            //         .updateMerchants(form, this.id)
                            //         .toPromise();
                            //     if (add) {
                            //         let successmsg =
                            //             this.translateService.instant(
                            //                 'Merchant updated successfully'
                            //             );
                            //         this.utilitiesService.showSuccessToast(
                            //             successmsg
                            //         );
                            //         // this.route.navigate([AppRoutes.Merchants]);
                            //     }
                            // }
                        });
                    } catch {
                    } finally {
                        this.utilitiesService.stopLoader();
                    }
                }
            }
        } else {
            for (const key of Object.keys(this.form.controls)) {
                this.form.controls[key].markAllAsTouched();
            }
        }
    }
}
