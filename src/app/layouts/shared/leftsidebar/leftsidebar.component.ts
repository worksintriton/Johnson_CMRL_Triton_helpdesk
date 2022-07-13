import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/core/services/cookie.service';

import { AuthenticationService } from '../../../core/services/auth.service';
import { SIDEBAR_WIDTH_CONDENSED } from '../../layout.model';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.scss'],

})
export class LeftsidebarComponent implements OnInit {

  @Input() sidebarType: string;
  user: any;

  constructor(private router: Router, private authenticationService: AuthenticationService, private cookieService : CookieService) 
  {  this.user = JSON.parse(this.cookieService.getCookie('currentUser'))  }

  ngOnInit() {
   
  }

  /**
   * Is sidebar condensed?
   */
  isSidebarCondensed() {
    return this.sidebarType === SIDEBAR_WIDTH_CONDENSED;
  }

 
}
