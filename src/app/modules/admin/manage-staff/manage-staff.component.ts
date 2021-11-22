import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAnimations } from '@fuse/animations';
import { TranslateService } from '@ngx-translate/core';
import { AppRoutes } from 'app/AppRoutes';
import { ManageStaffService } from 'app/services/manage-staff/manage-staff.service';
import { AlertModalComponent } from 'app/modules/components/alert-modal/alert-modal.component';
import { TranslationService } from 'app/services/translationService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthUSerService } from 'app/services/authUserService';
import { RolesService } from 'app/services/roles/roles.service';
import { Pagination } from 'app/pagination';
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
    staffs = [];
    staffsList = [];
    breadcrumbs = [];
    page = new Pagination().page;
    tabStatus = TabStatus;
    staffsCount: number = 0;
    staffsTableColumns: string[] = [
        'slno',
        'staff_firstname',
        'staff_lastname',
        'email',
        'contact_number',
        'Role',
        'action',
    ];
    form: FormGroup;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    searchKey: string;
    staffID: any = '';
    type: '';
    isBank = false;
    activeStatus: number = TabStatus.import;
    constructor(
        private route: Router,
        public translationService: TranslationService,
        public utilitiesService: UtilitiesService,
        private dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        public authUSerService: AuthUSerService,
        private translateService: TranslateService,
        private manageStaffService: ManageStaffService
    ) {
    this.activatedRoute.queryParams.subscribe((data) => {
        if(data.staffs){
            this.staffID = data.staffs;
        }
    })
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
        this.getStaffs();
    }

    getDisplayedColumns() {
        return this.staffsTableColumns;
    }

    async ngOnInit(): Promise<void> {
            this.form.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
            this.page = new Pagination().page
            this.getStaffs();
        });
        this.form = this.fb.group({
            staff_firstname: [''],
            staff_lastname:[''],
            email:[''],
            reference: [''],
            contact_number: [''],
            Role:['']
        });
        this.setBreadcrumbs();
        await this.getStaffs();
    }

    async getStaffs(
        limit = this.page.pageSize,
        offset = this.page.offset,
        form = this.form.controls
    ): Promise<void>{
        try{
            this.utilitiesService.startLoader();
            let staffs = await this.manageStaffService
                .getStaffs(limit, offset, this.searchKey, form)
                .toPromise();
                if(staffs){
                    this.page.length = staffs.count;
                    this.staffsList = staffs.results;
                    this.utilitiesService.stopLoader();
                }else{
                    this.utilitiesService.stopLoader();
                }
        }catch{
            this.utilitiesService.stopLoader();
        }finally{
        }
    }

    async handlePageEvent(event): Promise<void> {
        this.page.length = event.length;
        this.page.pageSize = event.pageSize;
        this.page.pageIndex = event.pageIndex;
        this.page.offset = this.page.pageIndex * this.page.pageSize;
        this.getStaffs();

    }

    setBreadcrumbs() {
        this.breadcrumbs = [
            {
                absolute: true,
                disabled: true,
                path: `{AppRoutes.ManageStaff}`,
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
         this.route.navigate([`${AppRoutes.ManageStaff}/edit/${id}`]);
    }
    view(id) {
         this.route.navigate([`${AppRoutes.ManageStaff}/view/${id}`]);
    }
    add() {
        this.route.navigate([`${AppRoutes.ManageStaff}/create/`]);
    }
}
