import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEngagementComponent } from 'app/modules/components/create-engagement/create-engagement.component';


import { ManageEngagementsComponent } from './manage-engagements.component';

const routes: Routes = [
    {
        path: '',
        component: ManageEngagementsComponent,
    },
    // {
    //     path: 'view/:id',
    //     component: ViewContractComponent,
    // },
    // {
    //     path: 'edit/:id',
    //     component: CreateContractComponent,
    // },
    {
        path: 'create',
        component: CreateEngagementComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageEngagementsRoutingModule {}
