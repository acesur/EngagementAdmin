import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../../services/sharedService';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';
import { API_URLS } from 'app/shared/API_URLS';

@Injectable({
    providedIn:'root'
})
export class ManageStaffService{
    apiDomain: any;
    constructor(
        private sharedService: SharedService,
        private http: HttpClient,
        private apiService: ApiService
    ){
        this.apiDomain = this.sharedService.apiDomain;
    }

    getStaffs(
        limit = 10,
        offset=0,
        searchKey: any = null,
        form: any = null,
    ): Observable<any>{
        let params = new HttpParams();
        params = params
            .set('limit', limit.toString())
            .set('offset', offset.toString())
            .set('search', searchKey);
            if(form){
                for( let key of Object.keys(form)){
                    params = params.set(
                    `${key}`,
                    `${form[key].value ? form[key].value: ''}`
                    );
                }
            }
            return this.apiService.get(API_URLS.Staffs, params, undefined);
    }

    getStaffDetails(id){
        return this.apiService.get(
            `${API_URLS.Staffs}${id}/`,
            undefined
        );
    }

    addStaff(form){
        return this.apiService.post(`${API_URLS.Staffs}`, form, undefined);
    }
    updateStaff(form, id){
        return this.apiService.put(
            `${API_URLS.Staffs}${id}/`,
            form,
            undefined
        );
    }

    deleteStaff(id){
        return this.apiService.delete(
            `${API_URLS.Staffs}${id}`,
            undefined,
            undefined
        );
    }

    getStaffsList(limit=10, offset=0, search='', form?){
        let params = new HttpParams();
        params = params
            .set('limit', limit.toString())
            .set('offset', offset.toString())
            .set('search', search);
            if (form) {
                for (let key of Object.keys(form)){
                    params = params.set(
                        `${key}`,
                        `${form[key].value ? form[key].value: ''}`
                    );
                }
            }
            return this.apiService.get(
                `${API_URLS.Staffs}`,
                params,
                undefined
            );
    }

}
