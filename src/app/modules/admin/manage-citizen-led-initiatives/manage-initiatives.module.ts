import { NgModule } from '@angular/core';

import { ManageInitiativesRoutingModule } from './manage-initiatives-routing.module';
import { ManageInitiativesComponent } from './manage-initiatives.component';
import { ComponentsModule } from 'app/modules/components/components.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [ManageInitiativesComponent],
    imports: [ManageInitiativesRoutingModule, SharedModule, ComponentsModule],
    exports: [],
})
export class ManageInitiativesModule {}
