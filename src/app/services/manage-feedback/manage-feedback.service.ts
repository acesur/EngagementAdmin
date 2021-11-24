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

    convertFormToFormData(form){
        let formData = new FormData();
        for (let key of Object.keys(form)){
           /*  let ( key == 'documents' ) {
                const documents = form[key];
                delete form.documents;
                documents.forEach((file) =>{
                    if(file.file){
                        formData.append(
                            'document_types',
                            file.document_type_id
                        );
                        formData.append('documents', file.file);
                    }
                });
            }else */ if (typeof form[key] == 'object'){
                formData.append(key, JSON.stringify(form[key]));
            }else{
                formData.append(`${key}`, `${form[key] ?  form[key] : ''} `);
            }
        }return formData;
    }
}
