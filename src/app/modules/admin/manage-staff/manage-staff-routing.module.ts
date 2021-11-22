import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateStaffComponent } from 'app/modules/components/create-staff/create-staff.component';

import { ManageStaffComponent } from './manage-staff.component';


const routes: Routes = [
    {
        path: '',
        component: ManageStaffComponent,
    },
    {
        path: 'create',
        component: CreateStaffComponent,
        pathMatch: 'full',
    },
     {
         path: 'edit/:id',
         component: CreateStaffComponent,
     },
     {
         path: 'view/:id',
         component: CreateStaffComponent,
     },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageStaffRoutingModule {}
