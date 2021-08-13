import { NgModule } from '@angular/core';
import { ManageEngagementsRoutingModule } from './manage-engagements-routing.module';
import { ManageEngagementsComponent } from './manage-engagements.component';
import { ComponentsModule } from 'app/modules/components/components.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [ManageEngagementsComponent],
    imports: [ManageEngagementsRoutingModule, SharedModule, ComponentsModule],
    exports: [],
})
export class ManageEngagementsModule {}
