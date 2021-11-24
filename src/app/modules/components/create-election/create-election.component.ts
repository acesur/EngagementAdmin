import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
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
import { debounceTime } from 'rxjs/operators';
import { ManageElectionService } from 'app/services/manage-election/manage-election.service';
import { ValidateInputs } from 'app/inputValidation';


@Component({
    selector: 'app-create-election',
    templateUrl: './create-election.component.html',
    styleUrls: ['./create-election.component.scss'],
    animations: FuseAnimations,
})
export class CreateElectionComponent implements OnInit {
    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
    @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
    myfilename = 'Select File';
    protected _onDestroy = new Subject<void>();
    id: any = '';
    breadcrumbs = [];
    electionDetails: any;
    afterViewInit = false;
    defaultValue: any;
    fileName = '';


    today = new Date();

    constructor(
        private fb: FormBuilder,
        private utilitiesService: UtilitiesService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        public translationService: TranslationService,
        private _location: Location,
        private translateService: TranslateService,
        private dialog: MatDialog,
        private manageElectionService: ManageElectionService,
        private validateInputs: ValidateInputs

    )

    // private additionalService: AdditionalService,
    // private settingsService: SettingsService
    {
        this.activatedRoute.params.subscribe((data) => {
            console.log(data['id']);
            this.id = data['id'];
        });
    }
    fileChangeEvent(fileInput: any){
        if(fileInput.target.files && fileInput.target.files[0]){
            this.myfilename = '';
            Array.from(fileInput.target.files).forEach((file: File) => {
                console.log(file);
                this.myfilename += file.name + ',';
            });
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const convertImageToBase64 = e.target.result;
                }
            }
            reader.readAsDataURL(fileInput.target.files[0]);
            this.uploadFileInput.nativeElement.value = "";
        }
        else{
        this.myfilename = 'Select File';
    }
    }

/*     fileChangeEvent(e: File[]){
        this.fileName = e[0];
        this.fileType = fileName.type;
    } */
/*     cancelUpload(){
        this.uploadSub.unsubscribe();
        this.reset();
    }
    reset(){
        this.uploadSub = null;
    } */
     onFileSelected(event){
        const file: File = event.target.files[0];
/*         if(file){
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("thumbnail", file);
            const upload$ = this.http.post("/api/thumbnail-upload", formData);
            uplaod$.subscribe();
        } */
    }

    filesFront: any = [];
    filesBack: any = [];
    form: FormGroup;
    async ngOnInit(): Promise<void> {
        this.utilitiesService.startLoader();
        this.setBreadcrumbs();
        await this.formInit();

        if (this.id) {
            await this.formInit();
        }
        /* this.afterViewInit = true; */
    }

    tes() {
        alert('dw');
    }
    async getDetails(){
        try{
            const electionDetails = await this.manageElectionService
                .getElectionDetails(this.id)
                .toPromise();
                if(electionDetails){
                    this.electionDetails = electionDetails;
                    this.utilitiesService.stopLoader();
                    this.formInit();
                }
        }catch{
        }finally{
        }
    }

    /* ngAfterViewInit() {} */

    async formInit() {
        this.form = this.fb.group({
            election_name: [
                this.electionDetails ? this.electionDetails.election_name : null,
                [Validators.required],
            ],
            election_description: [
                this.electionDetails ? this.electionDetails.election_description : null,
                [Validators.required],
            ],
            participants: [
                this.electionDetails ? this.electionDetails.participants : null,
                [Validators.required],
            ],
            start_date: [
                this.electionDetails ? this.electionDetails.start_date : null,
            ],
            end_date: [this.electionDetails ? this.electionDetails.end_date : null],
            start_time: [
                this.electionDetails ? this.electionDetails.start_time: null,
            ],
            end_time: [this.electionDetails ? this.electionDetails.end_time : null],
            option: [
                this.electionDetails
                    ? this.electionDetails.option
                    : null,
                [Validators.required],
            ],
            upload_image: [
                this.electionDetails
                    ? this.electionDetails.upload_image
                    : null,
                [Validators.required],
            ],
            security_level: [
                this.electionDetails
                    ? this.electionDetails.security_level
                    : null,
                [Validators.required],
            ]
        });
    }


    setBreadcrumbs() {
        this.breadcrumbs = [
            {
                absolute: true,
                disabled: false,
                path: `${AppRoutes.ManageElections}`,
                relative: false,
                name_en: 'Manage Elections',
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

/*     uploadFile(files) {
        let reader = this.utilitiesService.convertImageToBase64(files[0]);
        reader.onload = (readerEvt: any) => {
            this.form.controls.logo.setValue(readerEvt.target.result);
        };
    } */

    deleteLogo() {
        this.form.controls.logo.setValue(null);
    }
    save (){
        if (this.form.valid){
            if (this.id){
                this.updateElection();
            }else{
                this.addElection();
            }
        }else{
            for(const key of Object.keys(this.form.controls)){
                this.form.controls[key].markAllAsTouched();
            }
        }
    }

    updateElection(){
        let content = this.translateService.instant(
            'Are you sure, Do you want to update ?'
        );
        let heading = this.translateService.instant('update');
        let fromApp = false;
        let size = this.utilitiesService.isMobileAlertModal();
        const dialogRef = this.dialog.open(AlertModalComponent, {
            data: { content, heading,fromApp },
            maxWidth: '',
            width: `${size.width}`,
            height: `${size.height}`,
        });
        dialogRef.afterClosed().subscribe(async (resp) => {
            if(resp){
                let form = this.form.value;
                try{
                    this.utilitiesService.startLoader();
                        const addElection = this.manageElectionService
                            .updateElection(form, this.id)
                            .toPromise();
                        if(addElection){
                                let successmsg = this.translateService.instant(
                                    'Election Updated Successfully'
                                );
                                this.utilitiesService.showSuccessToast(successmsg);
                                this.route.navigate([AppRoutes.ManageElections]);
                        }
                }catch{
                }finally{
                }
            }
        });
    }
    async addElection(){
        let content = this.translateService.instant(
            'Are you sure, Do you want to save ?'
        );
        let heading = this.translateService.instant('save');
        let fromApp = false;
        let size = this.utilitiesService.isMobileAlertModal();
        const dialogRef = this.dialog.open(AlertModalComponent, {
            data: { content, heading, fromApp },
            maxWidth: '',
            width: `${size.width}`,
            height: `${size.height}`,
        });
        dialogRef.afterClosed().subscribe(async (resp) => {
            if(resp){
                let form = this.form.value;
                try{
                    this.utilitiesService.startLoader();
                    const addElection = await this.manageElectionService
                        .addElection(form)
                        .toPromise();
                    if(addElection){
                        let successmsg = this.translateService.instant(
                            'Election created successfully'
                        );
                        this.utilitiesService.showSuccessToast(successmsg);
                        this.route.navigate([AppRoutes.ManageElections]);
                    }
                }catch{

                }finally{
                }
            }
        });
    }
}
