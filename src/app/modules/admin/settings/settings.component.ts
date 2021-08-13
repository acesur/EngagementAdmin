import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/AppRoutes';
import { TranslationService } from 'app/services/translationService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { Subject } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { takeUntil } from 'rxjs/operators';
import { AuthUSerService } from 'app/services/authUserService';
import { TranslateService } from '@ngx-translate/core';
import { SettingsNavEnum } from 'app/permissionConstants';
import { FuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    animations: FuseAnimations,
})
export class SettingsComponent implements OnInit {
    breadcrumbs = [];
    allPermmissionList = [
        {
            model_name_en: 'Highly Secure',
            model_name_ar: 'اتفافية',
            permissions: [
                {
                    id: 1,
                    name_en: 'Email',
                    name_ar: 'قائمة العقد',
                    codename: 'get_contract-list',
                },
                {
                    id: 3,
                    name_en: 'Phone',
                    name_ar: 'عرض تفاصيل العقد',
                    codename: 'get_contract-detail',
                },

                {
                    id: 7,
                    name_en: 'Facial Recognition',
                    name_ar: 'عرض تفاصيل العقد',
                    codename: 'get_staff_contract-detail',
                },
                {
                    id: 20,
                    name_en: 'Residence ID',
                    name_ar: 'تنزيل تقرير العقد',
                    codename: 'get_staff_contract-download',
                },
                {
                    id: 21,
                    name_en: 'Driving License',
                    name_ar: 'تنزيل تقرير العقد',
                    codename: 'get_staff_contract-download',
                },
            ],
        },
        {
            model_name_en: 'Moderately Secure',
            model_name_ar: 'اتفافية',
            permissions: [
                {
                    id: 1,
                    name_en: 'Email',
                    name_ar: 'قائمة العقد',
                    codename: 'get_contract-list',
                },
                {
                    id: 3,
                    name_en: 'Phone',
                    name_ar: 'عرض تفاصيل العقد',
                    codename: 'get_contract-detail',
                },

                {
                    id: 7,
                    name_en: 'Facial Recognition',
                    name_ar: 'عرض تفاصيل العقد',
                    codename: 'get_staff_contract-detail',
                },
                {
                    id: 20,
                    name_en: 'Residence ID',
                    name_ar: 'تنزيل تقرير العقد',
                    codename: 'get_staff_contract-download',
                },
                {
                    id: 21,
                    name_en: 'Driving License',
                    name_ar: 'تنزيل تقرير العقد',
                    codename: 'get_staff_contract-download',
                },
            ],
        },
        {
            model_name_en: 'Less  Secure',
            model_name_ar: 'اتفافية',
            permissions: [
                {
                    id: 1,
                    name_en: 'Email',
                    name_ar: 'قائمة العقد',
                    codename: 'get_contract-list',
                },

                {
                    id: 6,
                    name_en: 'Phone',
                    name_ar: 'عرض قائمة العقود',
                    codename: 'get_staff_contract-list',
                },
                {
                    id: 7,
                    name_en: 'Facial Recognition',
                    name_ar: 'عرض تفاصيل العقد',
                    codename: 'get_staff_contract-detail',
                },
                {
                    id: 20,
                    name_en: 'Residence ID',
                    name_ar: 'تنزيل تقرير العقد',
                    codename: 'get_staff_contract-download',
                },
                {
                    id: 21,
                    name_en: 'Driving License',
                    name_ar: 'تنزيل تقرير العقد',
                    codename: 'get_staff_contract-download',
                },
            ],
        },
    ];
    constructor(
        private route: Router,
        public translationService: TranslationService,
        private fb: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        public authUserService: AuthUSerService,
        public utilitiesService: UtilitiesService,
        private translateService: TranslateService
    ) {}
    ngOnInit() {
        this.setBreadcrumbs()
    }
    setBreadcrumbs() {
        this.breadcrumbs = [
            {
                absolute: true,
                disabled: true,
                path: '',
                relative: false,
                name_en: 'Settings',
                name_ar: 'التقارير',
            },
        ];
    }
}
