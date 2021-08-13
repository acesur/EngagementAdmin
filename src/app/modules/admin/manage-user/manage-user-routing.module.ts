import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from 'app/modules/components/create-user/create-user.component';

import { ManageUserComponent } from './manage-user.component';

const routes: Routes = [
    {
        path: '',
        component: ManageUserComponent,
    },
    {
        path: 'create',
        component: CreateUserComponent,
        pathMatch: 'full',
    },
    // {
    //     path: 'edit/:id',
    //     component: CreateUserComponent,
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
export class ManageUserRoutingModule {}
