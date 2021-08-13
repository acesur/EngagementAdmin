import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseAnimations } from '@fuse/animations';
import { AppRoutes } from 'app/AppRoutes';
import { Pagination } from 'app/pagination';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-visual-analytics',
    templateUrl: './visual-analytics.component.html',
    styleUrls: ['./visual-analytics.component.scss'],
    animations: FuseAnimations,
})
export class VisualAnalyticsComponent implements OnInit {
    reports = [
        {
            name: 'Campus  Survey',
        },
        {
            name: 'Red Cross Election',
        },
        {
            name: 'Campus President Election ',
        },
        {
            name: 'Campus Polls',
        },
    ];
    single: any[];
    view: any[] = [700, 400];

    // options
    gradient: boolean = true;
    showLegend: boolean = true;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
    legendPosition: string = 'below';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    };
    breadcrumbs = [];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private route: Router) {}

    ngOnInit(): void {
        this.setBreadcrumbs();
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

    setBreadcrumbs() {
        this.breadcrumbs = [
            {
                absolute: true,
                disabled: true,
                path: '',
                relative: false,
                name_en: 'Visual Analytics',
                name_ar: 'التجار',
            },
        ];
    }

    ngAfterViewInit(): void {}

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    selectRow(row, event) {
        // this.route.navigate(
        //     [`${AppRoutes.Merchants}/view-transaction/${row.id}`],
        //     {
        //         queryParams: {
        //             state: 'reports',
        //         },
        //     }
        // );
    }
}
