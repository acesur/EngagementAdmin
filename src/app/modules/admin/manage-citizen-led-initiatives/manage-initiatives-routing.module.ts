import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCitizenComponent } from 'app/modules/components/create-citizen/create-citizen.component';


import { ManageInitiativesComponent } from './manage-initiatives.component';

const routes: Routes = [
    {
        path: '',
        component: ManageInitiativesComponent,
    },
    {
        path: 'create',
        component: CreateCitizenComponent,
        pathMatch: 'full',
    },
    // {
    //     path: 'view/:id',
    //     component: ViewMerchantsComponent,
    // },
    // {
    //     path: 'edit/:id',
    //     component: CreateMerchantComponent,
    // },
    // {
    //     path: 'view-transaction/:id',
    //     component: ViewTransactionsComponent,
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageInitiativesRoutingModule {}
