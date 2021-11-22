import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { ManageFeedbackService } from 'app/services/manage-feedback/manage-feedback.service';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.scss'],
  animations: FuseAnimations,
})
export class CreateFeedbackComponent implements OnInit {

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @ViewChild(DocumentsComponent)
  documentsComponent: DocumentsComponent;
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  public countryControl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  public filteredCountry: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  id: any = '';
  myfilename = 'Select File';
  breadcrumbs = [];
  bankNames = [];
  feedbackDetails: any;
  afterViewInit = false;
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
      private dialog: MatDialog,
      private manageFeedbackService: ManageFeedbackService
       // private outletsService: OutletsService, // private customerService: CustomerService, // private validateInputs: ValidateInputs,
  ) // private additionalService: AdditionalService,
  // private settingsService: SettingsService
  {
      this.activatedRoute.params.subscribe((data) => {
          console.log(data['id']);
          this.id = data['id'];
      });
  }
  fileChangeEvent(fileInput: any){
    if(fileInput.target.files && fileInput.target.files[0]){
        this.myfilename= '';
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
          internalfeedback_name: [
              this.feedbackDetails ? this.feedbackDetails.internalfeedback_name : null,
              [Validators.required],
          ],
          internalfeedback_description: [
              this.feedbackDetails ? this.feedbackDetails.internalfeedback_description : null,
              [Validators.required],
          ],
          participants: [
              this.feedbackDetails ? this.feedbackDetails.participants : null,
              [Validators.required],
          ],
          start_date: [
              this.feedbackDetails ? this.feedbackDetails.start_date : null,
          ],
          end_date: [this.feedbackDetails ? this.feedbackDetails.end_date : null],
          start_time: [
              this.feedbackDetails
                  ? this.feedbackDetails.start_time
                  : null,
          ],
          end_time: [this.feedbackDetails ? this.feedbackDetails.end_time : null],
          option: [
              this.feedbackDetails
                  ? this.feedbackDetails.option
                  : null,
              [Validators.required],
          ],
          upload_image: [
              this.feedbackDetails
                  ? this.feedbackDetails.upload_image
                  : null,
              [Validators.required],
          ],
          security_level: [
              this.feedbackDetails
                  ? this.feedbackDetails.security_level
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



  save(){
    if(this.form.valid){
        if(this.id){
            this.updateFeedback();
        }else{
            this.addFeedback();
        }
    }else{
        for(const key of Object.keys(this.form.controls)){
            this.form.controls[key].markAllAsTouched();
        }
    }
  }
  updateFeedback(){
    let content = this.translateService.instant(
        'Are you sure, Do you want to update?'
    );
    let heading = this.translateService.instant('update');
    let fromApp = false;
    let size = this.utilitiesService.isMobileAlertModal();
    const dialogRef = this.dialog.open(AlertModalComponent, {
        data: { content, heading, fromApp },
        maxWidth: '',
        width: `${size.width}`,
        height: `${size.height}`
    });
    dialogRef.afterClosed().subscribe(async(resp) => {
        if(resp){
            let form = this.form.value;
            try{
                this.utilitiesService.startLoader();
                    const addFeedback = this.manageFeedbackService
                        .updateFeedback(form, this.id)
                        .toPromise();
                    if(addFeedback){
                        let successmsg = this.translateService.instant(
                            'Feedback Updated Successfully'
                        );
                        this.utilitiesService.showSuccessToast(successmsg);
                    }
            }catch{
            }finally{
            }

        }
    });
  }
  async addFeedback(){
    let content = this.translateService.instant(
        'Are you sure, Do you want to save?'
    );
    let heading = this.translateService.instant('save');
    let fromApp = false;
    let size = this.utilitiesService.isMobileAlertModal();
    const dialogRef = this.dialog.open(AlertModalComponent, {
        data: { content, heading, fromApp },
        maxWidth: '',
        width: `${size.width}`,
        height: `${size.height}`
    });
    dialogRef.afterClosed().subscribe(async(resp)=> {
        if(resp){
            let form = this.form.value;
            try{
                this.utilitiesService.startLoader();
                const addFeedback = await this.manageFeedbackService
                    .addFeedback(form)
                    .toPromise();
                if(addFeedback){
                    let successmsg = this.translateService.instant(
                        'Feedback created successfully'
                    );
                    this.utilitiesService.showSuccessToast(successmsg);
                    this.route.navigate([AppRoutes.ManageInternalFeedback]);
                }
            }catch{

            }finally{
            }
        }
    });
  }


  getDocument() {
      let documents = [];
      try {
          if (this.feedbackDetails && this.feedbackDetails.documents) {
              documents = this.feedbackDetails.documents;
          }
          return documents;
      } catch {}
  }


}
