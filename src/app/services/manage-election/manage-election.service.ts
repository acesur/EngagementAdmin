import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../../services/sharedService';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';
import { API_URLS } from 'app/shared/API_URLS';


@Injectable({
    providedIn: 'root'
})

export class ManageElectionService{
    apiDomain: any;
   constructor(
    private sharedService: SharedService,
    private http: HttpClient,
    private apiService: ApiService
   ){
    this.apiDomain = this.sharedService.apiDomain;
   }

   getElectionDetail(id){
    return this.apiService.get(
        `${API_URLS.Elections}${id}`,
        undefined,
        undefined
    );
   }

   addElection(form){
    return this.apiService.post(`${API_URLS.Elections}`, form, undefined);
   }
   updateElection(form, id){
    return this.apiService.put(
        `${API_URLS.Elections}${id}/`,
        form,
        undefined
    );
   }
   deleteElection(id){
    return this.apiService.delete(
        `${API_URLS.Elections}${id}`,
        undefined,
        undefined
    );
   }
}
