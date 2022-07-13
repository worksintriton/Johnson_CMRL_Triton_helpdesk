import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonConstants } from 'src/app/common/common.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

 

  getCustomer(userId) {
    const params = new HttpParams().append("userId",userId);
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "/customer/get_customer",{params})
        .pipe(map(response => {
          return response;
        }));
    }
  
    createCustomer(params){
      return this.http.post<any>(CommonConstants.WEBAPI_URL + "/customer/create_customer",params)
      .pipe(map(response => {
        return response;
      }));
    }  
  
    updateCustomer(params){
      return this.http.patch<any>(CommonConstants.WEBAPI_URL + "/customer/update_customer",params)
      .pipe(map(response => {
        return response;
      }));
    }  
  
    deleteCustomer(customerId :string){
      const params = new HttpParams().append("customerId",customerId);
      return this.http.post<any>(CommonConstants.WEBAPI_URL + "/customer/delete_customer",{params})
      .pipe(map(response => {
        return response;
      }));
    }


    //invoice
    getAllInvoice(userId) {
      const params = new HttpParams().append("userId",userId);
      return this.http.get<any>(CommonConstants.WEBAPI_URL + "/invoice/get_all_invoice",{params})
          .pipe(map(response => {
            return response;
          }));
      }

}