import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAnimations } from '@fuse/animations';
import { AppRoutes} from 'app/AppRoutes';
import { ContractStatus, ContractStatuses } from 'app/contractStatus';
import { DownloadTypes } from 'app/downloadTypes';
import { DownloadListComponent } from 'app/modules/components/download-list/download-list.component';
import { TabStatus } from 'app/modules/constantsEnum';
import { Pagination } from 'app/pagination';
import { FilterTypes } from 'app/FilterTypes'
import { TranslationService} from 'app/services';
import { AuthUSerService } from 'app/services/authUserService';
import { ContractService } from 'app/services/contract/contract.service';
import { UtilitiesService } from 'app/services/utilitiesService';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ManageElectionService } from 'app/services/manage-election/manage-election.service'



@Component({
    selector: 'app-manage-elections',
    templateUrl: './manage-elections.component.html',
    styleUrls: ['./manage-elections.component.scss'],
    animations: FuseAnimations,
})
export class ManageElectionsComponent implements OnInit {
    filterType = FilterTypes;
    PaidStatus = TabStatus;
    tabStatus: number = TabStatus.All;
    electionsList = [];
    breadcrumbs = [];
    page = new Pagination().page;
    electionsCount: number = 0;
    electionsTableColumns: string[] = [
        'election_name',
        'start_date',
        'participants',
        'action',
    ];
    form: FormGroup;
    searchKey: string;
    constructor(
        private route: Router,
        public translationService: TranslationService,
        public utilitiesService: UtilitiesService,
        private dialog: MatDialog,
        private manageElectionService: ManageElectionService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,

/*         public authUSerService: AuthUSerService, */
    ) {
        this.setBreadcrumbs();
        this.form = this.fb.group({
            election_name: null,
            start_date: null,
            participants: null

        });
        this.getElections();
    }
        toggleStatus(value) {
        this.tabStatus = value;
        // this.getContracts();
    }
    ngOnInit(): void{
        this.form.valueChanges.pipe(debounceTime(400)).subscribe((data) => {
            this.page = new Pagination().page;
            this.getElections();
        });
    }

    getDisplayedColumns() {
        return this.electionsTableColumns;
    }

    async getElections(
        limit = this.page.pageSize,
        offset = this.page.offset,
        form = this.form.controls
    ): Promise<void>{
        try{
            this.utilitiesService.startLoader();
            const elections = await this.manageElectionService
                .getElectionsList(
                    Object.assign({
                        limit: this.page.pageSize, offset: this.page.offset
                    },
                        this.form.value
                    )
                )
                .toPromise();
        if (elections){
            this.page.length = elections.count;
            this.electionsList = elections.results;
            this.utilitiesService.stopLoader();
        }
    }catch{
        this.utilitiesService.stopLoader();
    }finally {
    }
}
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    setBreadcrumbs(): void {
        this.breadcrumbs = [
            {
                absolute: true,
                disabled: true,
                path: AppRoutes.ManageElections,
                relative: false,
                name_en: 'Manage Elections',
                name_ar: 'اتفافية',
            },
        ];
    }
    edit(id) {
         this.route.navigate([`${AppRoutes.ManageElections}/edit/${id}`]);
    }
    view(id) {
        console.log(this.form.value);
         this.route.navigate([`${AppRoutes.ManageElections}/view/${id}`]);
    }
    add() {
        this.route.navigate([`${AppRoutes.ManageElections}/create/`]);
    }
    async handlePageEvent(event): Promise<void> {
        this.page.length = event.length;
        this.page.pageSize = event.pageSize;
        this.page.pageIndex = event.pageIndex;
        this.page.offset = this.page.pageIndex * this.page.pageSize;
        this.getElections();
    }
}


