import { NgModule } from '@angular/core';


import { ComponentsModule } from 'app/modules/components/components.module';
import { SharedModule } from 'app/shared/shared.module';
import { ManageStaffRoutingModule } from './manage-staff-routing.module';
import { ManageStaffComponent } from './manage-staff.component';

@NgModule({
    declarations: [ManageStaffComponent],
    imports: [SharedModule, ManageStaffRoutingModule, ComponentsModule],
    exports: [],
})
export class ManageStaffModule {}
