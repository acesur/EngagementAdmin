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

@Component({
  selector: 'app-create-citizen',
  templateUrl: './create-citizen.component.html',
  styleUrls: ['./create-citizen.component.scss'],
  animations: FuseAnimations,
})
export class CreateCitizenComponent implements OnInit {

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @ViewChild(DocumentsComponent)
  documentsComponent: DocumentsComponent;
  public countryControl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  public filteredCountry: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'select File';
  id: any = '';
  breadcrumbs = [];
  businessCategory = [];
  bankNames = [];
  citizenDetails: any;
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
      private dialog: MatDialog // private outletsService: OutletsService, // private customerService: CustomerService, // private validateInputs: ValidateInputs,
  ) // private additionalService: AdditionalService,
  // private settingsService: SettingsService
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
      this.utilitiesService.startLoader();
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

  ngAfterViewInit() {}

  async formInit() {
      this.form = this.fb.group({
          citizenledinitiative_name: [
              this.citizenDetails ? this.citizenDetails.citizenledinitiative_name : null,
              [Validators.required],
          ],
          citizenledinitiative_description: [
              this.citizenDetails ? this.citizenDetails.citizenledinitiative_description : null,
              [Validators.required],
          ],
          participants: [
              this.citizenDetails ? this.citizenDetails.participants : null,
              [Validators.required],
          ],
          start_date: [
              this.citizenDetails ? this.citizenDetails.start_date : null,
          ],
          end_date: [this.citizenDetails ? this.citizenDetails.end_date : null],
          start_time: [
              this.citizenDetails
                  ? this.citizenDetails.start_time
                  : null,
          ],
          end_time: [this.citizenDetails ? this.citizenDetails.end_time : null],
          option: [
              this.citizenDetails
                  ? this.citizenDetails.option
                  : null,
              [Validators.required],
          ],
          upload_image: [
              this.citizenDetails
                  ? this.citizenDetails.upload_image
                  : null,
              [Validators.required],
          ],
          security_level: [
              this.citizenDetails
                  ? this.citizenDetails.security_level
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
              path: `${AppRoutes.ManageCitizenLedInitiatives}`,
              relative: false,
              name_en: 'Citized-Led-Initiatives',
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
  getDocument() {
      let documents = [];
      try {
          if (this.citizenDetails && this.citizenDetails.documents) {
              documents = this.citizenDetails.documents;
          }
          return documents;
      } catch {}
  }

}
