import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommonConstants } from 'src/app/common/common.constant';
import { BehaviorSubject, Observable } from 'rxjs';
import {  Subject, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  // private subject = new Subject<any>();
  // sendToCart(message: boolean) {
	// 	this.subject.next({ text: message });
	//   }

  //   getParameter(): Observable<any> {
  //     return this.subject.asObservable();
  //     }
  
  private subject = new Subject<number>();
  sendToSelectedProductCount(count: number) {
		this.subject.next(count);
	  }

  getSelectedProductCount(): Observable<number> {
      return this.subject.asObservable();
  }


  private cartCount = new Subject<number>();
  sendToCartCount(count: number){
    this.cartCount.next(count);
  }

  getCartCount(): Observable<number>{
    return this.cartCount.asObservable();
  }

  createCart(params,userId){
    var obj ={
   cartList:params,
   userId:userId
    }
    return this.http.post<any>(CommonConstants.WEBAPI_URL + "/cart/create_cart",obj)
    .pipe(map(response => {
      return response;
    }));
  }  


  deleteRecord(cartId :string){
    let params = new HttpParams();
    params = params.append("cartId", cartId);
    return this.http.delete<any>(CommonConstants.WEBAPI_URL + "/cart/delete_cart_ById",{params})
    .pipe(map(response => {
      return response;
    }));
  }

  getCartList(userId) {
    let params = new HttpParams();
    params = params.append("userId", userId);
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "/cart/get_cart_userId",{params})
        .pipe(map(response => { 
          return response;
        }));
    }

    updateCheckOutCartList(body) {
      return this.http.patch<any>(CommonConstants.WEBAPI_URL + "/cart/update_cart_list_from_checkout",body)
          .pipe(map(response => { 
            return response;
          }));
      }

}