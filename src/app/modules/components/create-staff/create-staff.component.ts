import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAnimations } from '@fuse/animations';
import { AppRoutes } from 'app/AppRoutes';
import { TranslationService } from 'app/services/translationService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ManageStaffService } from 'app/services/manage-staff/manage-staff.service';
import { RolesService } from 'app/services/roles/roles.service';
import { debounceTime } from 'rxjs/operators';
import { ValidateInputs } from 'app/inputValidation';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.scss'],
  animations: FuseAnimations,
})
export class CreateStaffComponent implements OnInit {

  id: any = '';
  breadcrumbs = [];
  form: FormGroup;
  staffDetails: any;
  roles = [];
  isLoadingEmail: boolean;
  emailError: boolean;
  constructor(
      private fb: FormBuilder,
      private utilitiesService: UtilitiesService,
      private route: Router,
      private activatedRoute: ActivatedRoute,
      public translationService: TranslationService,
      private _location: Location,
      private translateService: TranslateService,
      private dialog: MatDialog,
      private manageStaffService: ManageStaffService,
      private roleService: RolesService,
      private validateInputs: ValidateInputs
  ) {
      this.activatedRoute.params.subscribe((data) => {
          console.log(data['id']);
          this.id = data['id'];
      });
  }

  async ngOnInit(): Promise<void> {
      if (this.id) {
          // this.utilitiesService.startLoader();
      }
      this.formInit();
      this.setBreadcrumbs();
      // await this.getRoles();
      // let isBank = await this.utilitiesService.isBank();
      if (this.id ) {
          // await this.getDetails();
      }
  }
  async getRoles() {
      try {
          const roles = await this.roleService.getRoles().toPromise();
          if (roles) {
              this.roles = roles;
          }
      } catch {
      } finally {
      }
  }

  async getDetails() {
      try {
          const staffDetails = await this.manageStaffService
              .getStaffDetails(this.id)
              .toPromise();
          if (staffDetails) {
              this.staffDetails = staffDetails;
              this.utilitiesService.stopLoader();
              this.formInit();
          }
      } catch {
      } finally {
      }
  }

  async formInit() {
      this.form = this.fb.group({
          staff_firstname: [
              this.staffDetails ? this.staffDetails.staff_firstname : null,
              [Validators.required],
          ],
          staff_lastname: [this.staffDetails ? this.staffDetails.staff_lastname : null],
          email: [
              this.staffDetails ? this.staffDetails.email : null,
              [Validators.required, Validators.email],
          ],
          contact_number: [
              this.staffDetails ? this.staffDetails.contact_no : null,
              [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
          ],
          Role: [
              this.staffDetails ? this.staffDetails.Role : null,
              [Validators.required],
          ],
      });
      this.form.controls.email.valueChanges
          .pipe(debounceTime(400))
          .subscribe(async (data) => {
              if (!this.id) {
                  this.isLoadingEmail = true;
                  const value = await this.validateInputs.inputValidation(
                      data,
                      'email',
                      'user',
                      this.id
                  );
                  await this.setError(value, 'email');
              }

          });
      if (this.id) {
          this.form.controls.email.disable();
      }
  }

  isEmailError() {
      return this.emailError;
  }

  setError(value, name) {
      if (value) {
          if (name == 'email') {
              this.emailError = true;
          }
      } else {
          this.emailError = false;
      }
      this.form.get(name).markAsTouched();
      this.isLoadingEmail = false;
  }

  setBreadcrumbs() {
      this.breadcrumbs = [
          {
              absolute: true,
              disabled: false,
              path:AppRoutes.ManageStaff,
              relative: false,
              name_en: 'Manage Staff',
              name_ar: 'إدارة المستخدم',
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

  save() {
      if (this.form.valid && !this.emailError) {
          if (this.id) {
              this.updateStaff();
          } else {
              this.addStaff();
          }
      } else {
          for (const key of Object.keys(this.form.controls)) {
              this.form.controls[key].markAllAsTouched();
          }
      }
  }
  updateStaff() {
      let content = this.translateService.instant(
          'Are you sure, Do you want to update ?'
      );
      let heading = this.translateService.instant('Update');
      let fromApp = false;
      let size = this.utilitiesService.isMobileAlertModal();
      const dialogRef = this.dialog.open(AlertModalComponent, {
          data: { content, heading, fromApp },
          maxWidth: '',
          width: `${size.width}`,
          height: `${size.height}`,
      });
      dialogRef.afterClosed().subscribe(async (resp) => {
          if (resp) {
              let form = this.form.value;
              try {
                  this.utilitiesService.startLoader();
                    const addStaff = this.manageStaffService
                        .updateStaff(form, this.id)
                        .toPromise();
                    if (addStaff) {
                        let successmsg = this.translateService.instant(
                            'Staff Updated Successfully'
                        );
                        this.utilitiesService.showSuccessToast(successmsg);
                        this.route.navigate([AppRoutes.ManageStaff]);
                    }
                  // const addUser = await this.userService
                  //     .updateUser(form, this.id)
                  //     .toPromise();
                  // if (addUser) {
                  //     let successmsg = this.translateService.instant(
                  //         'User updated successfully'
                  //     );
                  //     this.utilitiesService.showSuccessToast(successmsg);
                  //     // this.route.navigate([AppRoutes.ManageUser]);
                  // }
              } catch {
              } finally {
                this.utilitiesService.stopLoader();
              }
          }
      });
  }

  async addStaff() {
      let content = this.translateService.instant(
          'Are you sure, Do you want to save ?'
      );
      let heading = this.translateService.instant('Save');
      let fromApp = false;
      let size = this.utilitiesService.isMobileAlertModal();
      const dialogRef = this.dialog.open(AlertModalComponent, {
          data: { content, heading, fromApp },
          maxWidth: '',
          width: `${size.width}`,
          height: `${size.height}`,
      });
      dialogRef.afterClosed().subscribe(async (resp) => {
          if (resp) {
              let form = this.form.value;
              try {
                this.utilitiesService.startLoader();
                const addStaff = await this.manageStaffService
                    .addStaff(form)
                    .toPromise();
                if(addStaff){
                    let successmsg = this.translateService.instant(
                        'Staff Created Successfully'
                    );
                    this.utilitiesService.showSuccessToast(successmsg);
                    this.route.navigate([AppRoutes.ManageStaff])
                }
              } catch {
              } finally {
                this.utilitiesService.stopLoader();
              }
          }
      });
  }
  goBack() {
      this._location.back();
  }

}
