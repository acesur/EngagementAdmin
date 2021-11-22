import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../../services/sharedService';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';
import { API_URLS } from 'app/sharedService/API_URLS';

@Injectable({
    providedIn: 'root'
})
export class ManageEngagementService{
    apiDomain: any;
    constructor(
        private sharedService: SharedService,
        private http: HttpClient,
        private apiService: ApiService
    )
    addEngagement(form){
        return this.apiService.post(`${API_URLS.Engagements}`, form, undefined);
    }
    updateEngagement(form, id){
        return this.apiService.put(
            `${API_URLS.Engagements}${id}/`,
            form,
            undefined
        )
    }
}
