import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { TranslateService } from '@ngx-translate/core';
import { AppRoutes } from 'app/AppRoutes';
import { PermissionWithNavigation } from 'app/permissionConstants';
import { AuthUSerService, UtilitiesService } from 'app/services';

@Injectable({
    providedIn: 'root',
})
export class MainNavigationResolver implements Resolve<any> {
    permissionWithNavigation: PermissionWithNavigation;
    constructor(
        private utilitiesService: UtilitiesService,
        private translatedService: TranslateService,
        private authUserService: AuthUSerService
    ) {}

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<any> {
        this.permissionWithNavigation = new PermissionWithNavigation();
        const navigation: FuseNavigationItem[] = [
            {
                id: 'dashboard',
                title: this.translatedService.instant('Dashboard'),
                type: 'basic',
                icon: 'mat_outline:dashboard',
                link: AppRoutes.Dashboard,
            },
            {
                id: 'manage-elections',
                title: this.translatedService.instant('Manage Elections'),
                type: 'basic',
                icon: 'mat_outline:account_balance',
                link: AppRoutes.ManageElections,
            },
            {
                id: 'manage-engagements',
                title: this.translatedService.instant('Manage Engagements'),
                type: 'basic',
                icon: 'mat_outline:people',
                link: AppRoutes.ManageEngagements,
            },
            {
                id: 'manage-citizens',
                title: this.translatedService.instant(
                    'Manage Citizen-Led Initiatives'
                ),
                type: 'basic',
                icon: 'mat_outline:reduce_capacity',
                link: AppRoutes.ManageCitizenLedInitiatives,
            },
            {
                id: 'manage-feedback',
                title: this.translatedService.instant(
                    'Manage Internal Feedback'
                ),
                type: 'basic',
                icon: 'mat_outline:feedback',
                link: AppRoutes.ManageInternalFeedback,
            },
            {
                id: 'manage-users',
                title: this.translatedService.instant('Manage Users'),
                type: 'basic',
                icon: 'mat_outline:supervised_user_circle',
                link: AppRoutes.ManageUsers,
            },
            {
                id: 'visual-analytics',
                title: this.translatedService.instant('Visual Analytics'),
                type: 'basic',
                icon: 'mat_outline:analytics',
                link: AppRoutes.VisualAnalytics,
            },
            {
                id: 'manage-staff',
                title: this.translatedService.instant('Manage Staff'),
                type: 'basic',
                icon: 'mat_outline:people_alt',
                link: AppRoutes.ManageStaff,
            },
            {
                id: 'role_permissions',
                title: this.translatedService.instant('Roles & Permissions'),
                type: 'basic',
                icon: 'mat_outline:security',
                link: AppRoutes.Roles,
            },
            {
                id: 'billing',
                title: this.translatedService.instant('Billing'),
                type: 'basic',
                icon: 'mat_outline:money',
                link: AppRoutes.Billings,
            },
            {
                id: 'settings',
                title: this.translatedService.instant('Settings'),
                type: 'basic',
                icon: 'mat_outline:settings',
                link: AppRoutes.Settings,
            },
        ];

        return {
            navigation: {
                compact: navigation,
                default: navigation,
                futuristic: navigation,
                horizontal: navigation,
            },
        };
    }
}
