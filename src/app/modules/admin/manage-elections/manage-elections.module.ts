import { NgModule } from '@angular/core';

import { ManageElectionsRoutingModule } from './manage-elections-routing.module';
import { ManageElectionsComponent } from './manage-elections.component';
import { ComponentsModule } from 'app/modules/components/components.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [ManageElectionsComponent],
    imports: [ManageElectionsRoutingModule, SharedModule, ComponentsModule],
    exports: [],
})
export class ManageElectionsModule {}
