import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseAnimations } from '@fuse/animations';
import { AppRoutes } from 'app/AppRoutes';
import { DashboardService } from 'app/services/dashboard/dashboard.service';
import { UtilitiesService } from 'app/services/utilitiesService';
import moment from 'moment';
export enum DashboardType{
    Election = "Elections",
    Engagement ="Engagements"
}
@Component({
    selector: 'app-bank-dashboard',
    templateUrl: './bank-dashboard.component.html',
    styleUrls: ['./bank-dashboard.component.scss'],
    animations: FuseAnimations,
})
export class BankDashboardComponent implements OnInit {
    single: any[];
    view: any[] = [700, 400];
    isElection: boolean = true;
    dashboardType = DashboardType
    selectedDashboard=DashboardType.Election

    // options
    gradient: boolean = true;
    showLegend: boolean = true;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
    legendPosition: string = 'below';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    };
    constructor(
        private route: Router,
        public utilitiesService: UtilitiesService,
        private dashboardService: DashboardService
    ) {}

    public get getUrl(): typeof AppRoutes {
        return AppRoutes;
    }
    ngOnInit() {
        this.single = [
            {
                name: 'TEST1',
                value: 8940000,
            },
            {
                name: 'TEST2',
                value: 5000000,
            },
            {
                name: 'TEST3',
                value: 7200000,
            },
            {
                name: 'TEST4',
                value: 6200000,
            },
        ];
    }
}
