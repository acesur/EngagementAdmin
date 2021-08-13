import { NgModule } from '@angular/core';
import { CommonAddButtonComponent } from './common-add-button/common-add-button.component';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import { CreateUserComponent } from './create-user/create-user.component';

import { SharedModule } from 'app/shared/shared.module';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { EmptyItemsComponent } from './empty-items/empty-items.component';
import { BankDashboardComponent } from './bank-dashboard/bank-dashboard.component';

import { DocumentsComponent } from './documents/documents.component';
import { CreateMerchantUserComponent} from './create-merchant-user/create-merchant-user.component';
import { CreateBankUserComponent } from './create-bank-user/create-bank-user.component';


import { DownloadButtonComponent } from './download-button/download-button.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { CreateRolesComponent } from './create-roles/create-roles.component';

import { ValidateInputs } from 'app/inputValidation';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CreateElectionComponent } from './create-election/create-election.component';
import { MatTimepickerModule } from 'mat-timepicker';
import { CreateEngagementComponent } from './create-engagement/create-engagement.component';
import { CreateCitizenComponent } from './create-citizen/create-citizen.component';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { CreateStaffComponent } from './create-staff/create-staff.component';

@NgModule({
    declarations: [
        CommonAddButtonComponent,
        BreadcrumbComponent,
        CreateUserComponent,
        AlertModalComponent,
        EmptyItemsComponent,
        BankDashboardComponent,
        DocumentsComponent,
        CreateMerchantUserComponent,
        CreateBankUserComponent,
        DownloadButtonComponent,
        DownloadListComponent,
        CreateRolesComponent,
        CreateElectionComponent,
        CreateEngagementComponent,
        CreateCitizenComponent,
        CreateFeedbackComponent,
        CreateStaffComponent,
    ],
    exports: [
        CommonAddButtonComponent,
        BankDashboardComponent,
        BreadcrumbComponent,
        EmptyItemsComponent,
        DocumentsComponent,
        CreateMerchantUserComponent,
        CreateBankUserComponent,
        DownloadButtonComponent,
        
    ],
    imports: [
        SharedModule,
        NgxSkeletonLoaderModule,
        MatProgressSpinnerModule,
        MatTimepickerModule
    ],
    providers: [MatDatepickerModule,ValidateInputs],
})
export class ComponentsModule {}
