import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateFeedbackComponent } from 'app/modules/components/create-feedback/create-feedback.component';


import { ManageFeedbackComponent } from './manage-feedback.component';

const routes: Routes = [
    {
        path: '',
        component: ManageFeedbackComponent,
    },
    {
        path: 'create',
        component: CreateFeedbackComponent,
        pathMatch: 'full',
    },
    // {
    //     path: 'edit/:id',
    //     component: CreateCustomerComponent,
    // },
    // {
    //     path: 'view/:id',
    //     component: ViewCustomerComponent,
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomersRoutingModule {}
