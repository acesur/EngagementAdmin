import { Component, OnInit } from '@angular/core';
import { FuseAnimations } from '@fuse/animations';
import { AppRoutes } from 'app/AppRoutes';
import { UtilitiesService } from 'app/services/utilitiesService';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: FuseAnimations,
})
export class DashboardComponent implements OnInit {
    breadcrumbs = [];
    user: any;
    constructor(private utilitiesService: UtilitiesService) {}

    async ngOnInit(): Promise<void> {
        let users = localStorage.getItem('user');
        this.user = JSON.parse(users);
        this.setBreadcrumbs();
    }

    setBreadcrumbs() {
        this.breadcrumbs = [
            {
                absolute: true,
                disabled: true,
                path: `${AppRoutes.Dashboard}`,
                relative: false,
                name_en: 'Dashboard',
                name_ar: 'لوحة القيادة',
            },
        ];
    }
}
