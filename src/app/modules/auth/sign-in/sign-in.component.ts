import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUSerService } from 'app/services/authUserService';
import { TranslationService } from 'app/services/translationService';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: FuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private translationService: TranslationService,
        private authUserService: AuthUSerService,
        private translateService: TranslateService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;
        let form = this.signInNgForm.value;
        if (form.email == 'veras@test.com' && form.password == 'veras@123') {
            localStorage.setItem(
                'access_token',
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NjUzNDU3LCJqdGkiOiIyMzU2MGI2ZDYwMTM0MzMyYTZkYThlOWUwZDJiMWQwNCIsInVzZXJfaWQiOjJ9.vhQz8OLPObz78hJ_No_UwE128t4ucP-TBBu-tI4_RYM'
            );
            const redirectURL =
                this._activatedRoute.snapshot.queryParamMap.get(
                    'redirectURL'
                ) || '/signed-in-redirect';
            this._router.navigateByUrl(redirectURL);
        } else {
            this.signInForm.enable();

            // Reset the form
            this.signInNgForm.resetForm();
            // Set the alert
            this.alert = {
                type: 'error',
                message: this.translateService.instant('Login failed'),
            };

            // Show the alert
            this.showAlert = true;
        }

        // Sign in
        // this._authService.signIn(this.signInForm.value).subscribe(
        //     (resp) => {
        //         if (resp) {

        //             const redirectURL =
        //                 this._activatedRoute.snapshot.queryParamMap.get(
        //                     'redirectURL'
        //                 ) || '/signed-in-redirect';

        //             this._router.navigateByUrl(redirectURL);
        //         } else {
        //             this.signInForm.enable();
        //             this.signInNgForm.resetForm();
        //             this.alert = {
        //                 type: 'error',
        //                 message: this.translateService.instant('Login failed') ,
        //             };
        //             this.showAlert = true;
        //         }
        //     },
        //     (response) => {
        //         this.signInForm.enable();
        //         this.signInNgForm.resetForm();
        //         console.log(response);
        //         this.alert = {
        //             type: 'error',
        //             message: this.translationService.getTranslatedField(
        //                 response.error,
        //                 'error'
        //             ),
        //         };
        //         this.showAlert = true;
        //     }
        // );
    }
}
