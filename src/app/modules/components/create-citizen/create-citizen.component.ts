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
import { ManageInitiativeService } from 'app/services/manage-citizen-led-initiatives/manage-initiative.service';

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
  myfilename = 'Select File';
  id: any = '';
  breadcrumbs = [];
  bankNames = [];
  citizenDetails: any;
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
      private manageInitiativeService: ManageInitiativeService
       // private outletsService: OutletsService, // private customerService: CustomerService, // private validateInputs: ValidateInputs,
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
            this.updateInitiative();
        }else{
            this.addInitiative();
        }
    }else{
        for(const key of Object.keys(this.form.controls)){
            this.form.controls[key].markAllAsTouched();
        }
    }
  }

  updateInitiative(){
    let content = this.translateService.instant(
        'Are you sure, Do you want to update?'
    );
    let heading = this.translateService.instant('update');
    let fromApp = false;
    let size = this.utilitiesService.isMobileAlertModal();
    const dialogRef = this.dialog.open(AlertModalComponent,{
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
                    const addInitiative = this.manageInitiativeService
                        .updateInitiative(form, this.id)
                        .toPromise();
                    if(addInitiative){
                        let successmsg = this.translateService.instant(
                            'Citizen Initiative Updated Successfully'
                        );
                        this.utilitiesService.showSuccessToast(successmsg);
                    }
            }catch{
            }finally{
                this.utilitiesService.stopLoader();
            }

        }
    });
  }
  async addInitiative(){
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
    dialogRef.afterClosed().subscribe(async(resp) => {
        if(resp){
            let form = this.form.value;
            try{
                this.utilitiesService.startLoader();
                const addInitiative = await this.manageInitiativeService
                    .addInitiative(form)
                    .toPromise();
                if(addInitiative){
                    let successmsg = this.translateService.instant(
                        'Citizen Initiative created Successfully'
                    );
                    this.utilitiesService.showSuccessToast(successmsg);
                    this.route.navigate([AppRoutes.ManageCitizenLedInitiatives]);
                }
            }catch{

            }finally{
                this.utilitiesService.stopLoader();
            }
        }
    });
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
