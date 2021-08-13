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

  ngAfterViewInit() {}

  async formInit() {
      this.form = this.fb.group({
          name: [
              this.merchantDetails ? this.merchantDetails.name : null,
              [Validators.required],
          ],
          email: [
              this.merchantDetails ? this.merchantDetails.email : null,
              [Validators.required, Validators.email],
          ],
          contact_no: [
              this.merchantDetails ? this.merchantDetails.contact_no : null,
              [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
          ],
          address: [
              this.merchantDetails ? this.merchantDetails.address : null,
          ],
          city: [this.merchantDetails ? this.merchantDetails.city : null],
          country_id: [
              this.merchantDetails
                  ? this.merchantDetails.country
                      ? this.merchantDetails.country
                      : null
                  : null,
          ],
          pb_no: [this.merchantDetails ? this.merchantDetails.pb_no : null],
          // vat_registration: [
          //     this.merchantDetails
          //         ? this.merchantDetails.vat_registration
          //         : null,
          //     [Validators.required],
          // ],
          // vat_issue_date: [
          //     this.merchantDetails
          //         ? this.merchantDetails.vat_issue_date
          //         : null,
          //     [Validators.required],
          // ],
          trade_license_number: [
              this.merchantDetails
                  ? this.merchantDetails.trade_license_number
                  : null,
              [Validators.required],
          ],
          license_issue_date: [
              this.merchantDetails
                  ? this.merchantDetails.license_issue_date
                  : null,
              [Validators.required],
          ],
          license_expiry_date: [
              this.merchantDetails
                  ? this.merchantDetails.license_expiry_date
                  : null,
              [Validators.required],
          ],
          // license_issue_country_id: [
          //     this.merchantDetails
          //         ? this.merchantDetails.license_issue_country
          //             ? this.merchantDetails.license_issue_country.id
          //             : null
          //         : null,
          // ],
          authorized_signatory_id: [
              this.merchantDetails
                  ? this.merchantDetails.authorized_signatory_id
                  : null,
              [Validators.required],
          ],
          id_expiry_date: [
              this.merchantDetails
                  ? this.merchantDetails.id_expiry_date
                  : null,
              [Validators.required],
          ],
          id_dob: [
              this.merchantDetails ? this.merchantDetails.id_dob : null,
              [Validators.required],
          ],

          id_name: [
              this.merchantDetails ? this.merchantDetails.id_name : null,
              [Validators.required],
          ],
          // id_issue_country_id: [
          //     this.merchantDetails
          //         ? this.merchantDetails.id_issue_country
          //             ? this.merchantDetails.id_issue_country.id
          //             : null
          //         : null,
          //     [Validators.required],
          // ],
          bank_id: [
              this.merchantDetails
                  ? this.merchantDetails.bank
                      ? this.merchantDetails.bank.id
                      : null
                  : null,
              [Validators.required],
          ],
          bank_account_no: [
              this.merchantDetails
                  ? this.merchantDetails.bank_account_no
                  : null,
              [Validators.required],
          ],
          iban_no: [
              this.merchantDetails ? this.merchantDetails.iban_no : null,
              [Validators.required],
          ],
          bank_account_name: [
              this.merchantDetails
                  ? this.merchantDetails.bank_account_name
                  : null,
              [Validators.required],
          ],
          logo: [this.merchantDetails ? this.merchantDetails.logo : null],
          business_category_id: [
              this.merchantDetails
                  ? this.merchantDetails.business_category
                      ? this.merchantDetails.business_category.id
                          ? this.merchantDetails.business_category.id
                          : ''
                      : ''
                  : '',
              [Validators.required],
          ],
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
          if (this.merchantDetails && this.merchantDetails.documents) {
              documents = this.merchantDetails.documents;
          }
          return documents;
      } catch {}
  }

}
