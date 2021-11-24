import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateElectionComponent } from "app/modules/components/create-election/create-election.component";

import { ManageElectionsComponent } from "./manage-elections.component";

const routes: Routes = [
    {
        path: "",
        component: ManageElectionsComponent,

    },
     {
         path: 'view/:id',
         component: CreateElectionComponent,
     },
     {
         path: 'edit/:id',
         component: CreateElectionComponent,
     },
    {
        path: 'create',
        component: CreateElectionComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageElectionsRoutingModule {}
