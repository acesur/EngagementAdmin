import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAnimations } from '@fuse/animations';
import { TranslateService } from '@ngx-translate/core';
import { AppRoutes } from 'app/AppRoutes';
import { ContractStatus, ContractStatuses } from 'app/contractStatus';
import { AlertModalComponent } from 'app/modules/components/alert-modal/alert-modal.component';
import { TabStatus } from 'app/modules/constantsEnum';
import { Pagination } from 'app/pagination';
import { AuthUSerService } from 'app/services/authUserService';
import { OutletsService } from 'app/services/outlets/outlets.service';
import { TranslationService } from 'app/services/translationService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-manage-initiatives',
    templateUrl: './manage-initiatives.component.html',
    styleUrls: ['./manage-initiatives.component.scss'],
    animations: FuseAnimations,
})
export class ManageInitiativesComponent implements OnInit {
    contracts = [];
    breadcrumbs = [];
    page = new Pagination().page;
    PaidStatus = TabStatus;
    productsCount: number = 0;
    productsTableColumns: string[] = [
        'slno',
        'description',
        'start_date',
        'voter_list',
        'action',
    ];
    form: FormGroup;

    contractEnum = new ContractStatuses();
    contractStatus = ContractStatus;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    searchKey: string;
    customerID: any = '';
    merchantID: any = '';
    type: '';
    isBank = false;
    tabStatus: number = TabStatus.All;
    constructor(
        private route: Router,
        public translationService: TranslationService,
        public utilitiesService: UtilitiesService,
        private dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        public authUSerService: AuthUSerService,
    ) {
        // this.activatedRoute.queryParams.subscribe((data) => {
        //     if (data.customer) {
        //         this.tabStatus = PaidStatus.All;
        //         this.customerID = data.customer;
        //     } else if (data.merchant) {
        //         this.tabStatus = PaidStatus.All;
        //         this.merchantID = data.merchant;
        //     } else if (data.type) {
        //         this.tabStatus = PaidStatus.All;
        //         this.type = data.type;
        //     }
        // });
    }

    toggleStatus(value) {
        this.tabStatus = value;
        // this.getContracts();
    }

    getDisplayedColumns() {
        return this.productsTableColumns;
    }

    async ngOnInit(): Promise<void> {
        this.isBank = await this.utilitiesService.isBank();
        this.form = this.fb.group({
            name: [''],
            reference: [''],
            contract_status: [''],
            contact_no: [''],
        });
        this.setBreadcrumbs();
        if (this.type) {
            if (this.type == 0) {
                this.form.controls.contract_status.setValue('');
            } else {
                this.form.controls.contract_status.setValue(+this.type);
            }
        }
        // await this.getContracts();
        // this.form.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
        //     this.page = new Pagination().page
        //     this.getContracts();
        // });
    }

    // async getContracts(
    //     limit = this.page.pageSize,
    //     offset = this.page.offset,
    //     form = this.form.controls
    // ) {
    //     try {
    //         this.utilitiesService.startLoader();
    //         let tabStatus = false;
    //         let isAddShow = false;
    //         if (this.tabStatus == PaidStatus.Paid) {
    //             isAddShow = true;
    //             tabStatus = true;
    //         } else if (this.tabStatus == PaidStatus.Unpaid) {
    //             isAddShow = true;
    //             tabStatus = false;
    //         } else {
    //             isAddShow = false;
    //         }
    //         let contracts = await this.contractService
    //             .getContracts(
    //                 limit,
    //                 offset,
    //                 this.searchKey,
    //                 form,
    //                 this.customerID,
    //                 this.merchantID,
    //                 !this.isBank ? isAddShow : false,
    //                 '',
    //                 tabStatus
    //             )
    //             .toPromise();
    //         if (contracts) {
    //             this.page.length = contracts.count;
    //             this.contracts = contracts.results;
    //             this.utilitiesService.stopLoader();
    //         } else {
    //             this.utilitiesService.stopLoader();
    //         }
    //     } catch {
    //         this.utilitiesService.stopLoader();
    //     } finally {
    //     }
    // }

    handlePageEvent(event) {
        this.page.length = event.length;
        this.page.pageSize = event.pageSize;
        this.page.pageIndex = event.pageIndex;
        this.page.offset = this.page.pageIndex * this.page.pageSize;
        // this.getContracts();
    }
    // `${AppRoutes.Contract}`,
    setBreadcrumbs() {
        this.breadcrumbs = [
            {
                absolute: true,
                disabled: true,
                path: AppRoutes.ManageEngagements,
                relative: false,
                name_en: 'Citized-Led-Initiatives',
                name_ar: 'اتفافية',
            },
        ];
    }

    ngAfterViewInit(): void {}
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    edit(id) {
        // this.route.navigate([`${AppRoutes.Contract}/edit/${id}`]);
    }
    view(id) {
        // this.route.navigate([`${AppRoutes.Contract}/view/${id}`]);
    }
    add() {
        this.route.navigate([`${AppRoutes.ManageCitizenLedInitiatives}/create/`]);
    }
}
