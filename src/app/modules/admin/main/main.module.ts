import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppRoutes } from 'app/AppRoutes';
import { MainComponent } from 'app/modules/admin/main/main.component';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'app/modules/components/components.module';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'dashboard',
                redirectTo: AppRoutes.Dashboard,
                pathMatch: 'full',
            },
            {
                path: AppRoutes.Dashboard,
                // canActivate: [GuradService],
                loadChildren: () =>
                    import('../dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: AppRoutes.ManageEngagements,
                // canActivate: [GuradService],
                loadChildren: () =>
                    import('../manage-engagements/manage-engagements.module').then(
                        (m) => m.ManageEngagementsModule
                    ),
            },
            {
                path: AppRoutes.ManageElections,
                // canActivate: [GuradService],
                loadChildren: () =>
                    import('../manage-elections/manage-elections.module').then(
                        (m) => m.ManageElectionsModule
                    ),
            },
            {
                path: AppRoutes.ManageCitizenLedInitiatives,
                // canActivate: [GuradService],
                loadChildren: () =>
                    import('../manage-citizen-led-initiatives/manage-initiatives.module').then(
                        (m) => m.ManageInitiativesModule    
                    ),
            },
            {
                path: AppRoutes.ManageInternalFeedback,
                // canActivate: [GuradService],
                loadChildren: () =>
                    import('../manage-feedback/manage-feedback.module').then(
                        (m) => m.ManageFeedbackModule
                    ),
            },
            {
                path: AppRoutes.ManageUsers,
                // canActivate: [GuradService],
                loadChildren: () =>
                    import('../manage-user/manage-user.module').then(
                        (m) => m.ManageUserModule
                    ),
            },
            {
                path: AppRoutes.VisualAnalytics,
                // canActivate: [GuradService],
                loadChildren: () =>
                    import('../visual-analytics/visual-analytics.module').then(
                        (m) => m.VisualAnalyticsModule
                    ),
            },
            {
                path: AppRoutes.ManageStaff,
                // canActivate: [GuradService],
                loadChildren: () =>
                    import('../manage-staff/manage-staff.module').then(
                        (m) => m.ManageStaffModule
                    ),
            },
            {
                path: AppRoutes.Roles,
                // canActivate: [GuradService],
                loadChildren: () =>
                    import('../roles-management/roles-management.module').then(
                        (m) => m.RolesManagementModule
                    ),
            },
            {
                path: AppRoutes.Settings,
                loadChildren: () =>
                    import('../settings/settings.module').then(
                        (m) => m.SettingsModule
                    ),
            },
            {
                path: AppRoutes.Billings,
                // canActivate: [GuradService],
                loadChildren: () =>
                    import('../billing/billing.module').then(
                        (m) => m.BillingModule
                    ),
            },      
        ],
    },
];

@NgModule({
    declarations: [MainComponent],
    imports: [
        RouterModule.forChild(exampleRoutes),
        TranslateModule,
        ComponentsModule,
    ],
})
export class MainModule {}
