import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../../services/sharedService';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';
import { API_URLS } from 'app/shared/API_URLS';

@Injectable({
    providedIn: 'root'
})
export class ManageFeedbackService{
    apiDomain: any;
    constructor(
        private sharedService: SharedService,
        private http: HttpClient,
        private apiService: ApiService
    ){
        this.apiDomain = this.sharedService.apiDomain;
    }

    getFeedbackDetail(id){
        return this.apiService.get(
            `${API_URLS.Feedbacks}${id}`,
            undefined,
            undefined
        );
    }

    addFeedback(form){
        return this.apiService.post(`${API_URLS.Feedbacks}`,form, undefined);
    }
    updateFeedback(form, id){
        return this.apiService.put(
            `${API_URLS.Feedbacks}${id}/`,
            form,
            undefined
        );
    }
    deleteFeedback(id){
        return this.apiService.delete(
            `${API_URLS.Feedbacks}${id}`,
            undefined,
            undefined
        );
    }
}
