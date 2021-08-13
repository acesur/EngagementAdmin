import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'app/AppRoutes';
import { TranslationService } from 'app/services/translationService';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
    @Input() breadcrumbs = [];
    @Input() isDashboard=false
    constructor(
        public translationService: TranslationService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      console.log(this.breadcrumbs)
    }

    handleClick({ path, relative, disabled, absolute }) {
        if (!disabled)
            this.router.navigate([path], {
                relativeTo: relative ? this.route : null,
                replaceUrl: absolute,
            });
    }
}
