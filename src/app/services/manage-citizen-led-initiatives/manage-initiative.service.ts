import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../../services/sharedService';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';
import { API_URLS } from 'app/shared/API_URLS';

@Injectable({
    providedIn: 'root'
})

export class ManageInitiativeService{
    apiDomain: any;
    constructor(
        private sharedService: SharedService,
        private http: HttpClient,
        private apiService: ApiService
    ){
        this.apiDomain = this.sharedService.apiDomain;
    }

    addInitiative(form){
        return this.apiService.post(`${API_URLS.Initiatives}`, form, undefined);
    }
    updateInitiative(form, id){
        return this.apiService.put(
            `${API_URLS.Initiatives}${id}/`,
            form,
            undefined
        )
    }
}
