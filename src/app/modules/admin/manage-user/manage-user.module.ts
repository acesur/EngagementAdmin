import { NgModule } from '@angular/core';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import { ManageUserComponent } from './manage-user.component';
import { ComponentsModule } from 'app/modules/components/components.module';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    declarations: [
        ManageUserComponent,

    ],
    imports: [SharedModule, ManageUserRoutingModule, ComponentsModule],
    exports: [],
})
export class ManageUserModule {}
