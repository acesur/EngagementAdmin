import { Component, OnInit } from '@angular/core';
import { FuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.scss'],
    animations: FuseAnimations,
})
export class BillingComponent implements OnInit {
    breadcrumbs: any;
    isPaymentTab = false;
    cardDetails = [
        {
            card_name: 'Debit Card ******3434',
            name: 'ABCD Technologies LLC',
        },
        {
            card_name: 'Credit Card ******4343',
            name: 'ABCD Technologies LLC',
        },
        {
            card_name: 'Saving ******0101',
            name: 'ABCD Technologies LLC',
        },
    ];
    constructor() {}
    ngOnInit() {
        this.setBreadcrumbs();
    }
    toggleStatus(value) {
        this.isPaymentTab = value;
    }
    setBreadcrumbs() {
        this.breadcrumbs = [
            {
                absolute: true,
                disabled: true,
                path: '',
                relative: false,
                name_en: 'Billing',
                name_ar: 'التقارير',
            },
        ];
    }
}
