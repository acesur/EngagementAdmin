import { NgModule } from '@angular/core';

import { CustomersRoutingModule } from './manage-feedback-routing.module';
import { ManageFeedbackComponent } from './manage-feedback.component';
import { ComponentsModule } from 'app/modules/components/components.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [ManageFeedbackComponent],
    imports: [SharedModule, CustomersRoutingModule, ComponentsModule],
    exports: [],
})
export class ManageFeedbackModule {}
