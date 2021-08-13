import { NgModule } from '@angular/core';

import { VisualAnalyticsRoutingModule } from './visual-analytics-routing.module';
import { VisualAnalyticsComponent } from './visual-analytics.component';
import { ComponentsModule } from 'app/modules/components/components.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [VisualAnalyticsComponent],
    imports: [VisualAnalyticsRoutingModule, SharedModule, ComponentsModule],
    exports: [],
})
export class VisualAnalyticsModule {}
