import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { TranslateModule } from '@ngx-translate/core';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { ComponentsModule } from 'app/modules/components/components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './settings-routing.module';

@NgModule({
    declarations: [
        SettingsComponent,
    ],
    imports: [
        SettingsRoutingModule,
        ComponentsModule,
        TranslateModule,
        FuseDrawerModule,
        FuseNavigationModule,
        FuseScrollResetModule,
        RouterModule.forChild(routes),
        MatSidenavModule,
        FuseDrawerModule,
        FuseNavigationModule,
        FuseScrollResetModule,
        SharedModule,
    ],
    exports: [],
})
export class SettingsModule {}
