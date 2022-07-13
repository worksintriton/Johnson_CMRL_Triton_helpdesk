import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CookieService } from '../services/cookie.service';
import { User } from '../models/auth.models';
import { CommonConstants } from 'src/app/common/common.constant';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    user: User;

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie('currentUser'));
        }
        return this.user;
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
      
        
        //   return this.http.post<any>(CommonConstants.WEBAPI_URL +`/users/authenticate`, { email, password })
        return this.http.post<any>(CommonConstants.WEBAPI_URL +`userdetails/authenticate`, { email, password })
            .pipe(map(user => {
                console.log("user ",user);
                // login successful if there's a jwt token in the response
                if (user.Data) {
                    this.user = user.Data;
                    // store user details and jwt in cookie
                    this.cookieService.setCookie('currentUser', JSON.stringify(user.Data), 1);
                }
                return user.Data;
            }));
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie('currentUser');
        this.cookieService.deleteCookie('isClear');
        this.user = null;
    }




  
}


