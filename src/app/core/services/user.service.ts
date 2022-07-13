import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/auth.models';
import { CommonConstants } from 'src/app/common/common.constant';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/api/login`);
    }

    getAllSalesPerson() {
      return this.http.get<any>(CommonConstants.WEBAPI_URL + "/users/get_salesPerson")
          .pipe(map(response => {
            return response;
          }));
      }
    
      createSalesPerson(params){
        return this.http.post<any>(CommonConstants.WEBAPI_URL + "/users/create_salesPerson",params)
        .pipe(map(response => {
          return response;
        }));
      }  
    
      updateSalesPerson(params){
        return this.http.patch<any>(CommonConstants.WEBAPI_URL + "/users/update_salesPerson",params)
        .pipe(map(response => {
          return response;
        }));
      }  
    
      deleteRecord(recordId :string){
        // let params = new HttpParams();
        // params = params.append("productId", recordId);
        return this.http.post<any>(CommonConstants.WEBAPI_URL + "/users/delete_salesPerson",{recordId})
        .pipe(map(response => {
          return response;
        }));
      }

}