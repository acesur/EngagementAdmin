import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAnimations } from '@fuse/animations';
import { TranslateService } from '@ngx-translate/core';
import { AppRoutes } from 'app/AppRoutes';
import { ManageUserService } from 'app/services/manage-user/manage-user.service';
import { AlertModalComponent } from 'app/modules/components/alert-modal/alert-modal.component';
import { TranslationService } from 'app/services/translationService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthUSerService } from 'app/services/authUserService';
import { RolesService } from 'app/services/roles/roles.service';
import { Pagination } from 'app/pagination';
import { ContractStatus, ContractStatuses } from 'app/contractStatus';
import { ContractService } from 'app/services';
export enum TabStatus {
    import = 1,
    export = 2,
}
@Component({
    selector: 'app-manage-staff.',
    templateUrl: './manage-staff.component.html',
    styleUrls: ['./manage-staff.component.scss'],
    animations: FuseAnimations,
})
export class ManageStaffComponent implements OnInit {
    contracts = [];
    breadcrumbs = [];
    page = new Pagination().page;
    tabStatus = TabStatus;
    productsCount: number = 0;
    productsTableColumns: string[] = [
        'slno',
        'user_name',
        'email',
        'contact_no',
        'role',
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
    activeStatus: number = TabStatus.import;
    constructor(
        private route: Router,
        public translationService: TranslationService,
        public utilitiesService: UtilitiesService,
        private dialog: MatDialog,
        private contractService: ContractService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        public authUSerService: AuthUSerService,
        private translateService: TranslateService,
    ) {
        // this.activatedRoute.queryParams.subscribe((data) => {
        //     if (data.customer) {
        //         this.tabStatus = tabStatus.All;
        //         this.customerID = data.customer;
        //     } else if (data.merchant) {
        //         this.tabStatus = tabStatus.All;
        //         this.merchantID = data.merchant;
        //     } else if (data.type) {
        //         this.tabStatus = tabStatus.All;
        //         this.type = data.type;
        //     }
        // });
    }

    toggleStatus(value) {
        this.activeStatus = value;
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
    //         if (this.tabStatus == tabStatus.Paid) {
    //             isAddShow = true;
    //             tabStatus = true;
    //         } else if (this.tabStatus == tabStatus.Unpaid) {
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
                path: AppRoutes.ManageStaff,
                relative: false,
                name_en: 'Manage Staff',
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
        this.route.navigate([`${AppRoutes.ManageStaff}/create/`]);
    }
}
