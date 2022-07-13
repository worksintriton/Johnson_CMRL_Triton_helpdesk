import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../core/services/auth.service';

import { Notification } from './topbar.model';
import Swal from 'sweetalert2'
import { notificationItems } from './data';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { User } from 'src/app/core/models/auth.models';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { CookieService } from 'src/app/core/services/cookie.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  returnUrl: string;
  subscription: Subscription;
  cartCountSubscription: Subscription;
  notificationItems: Notification[];
  languages: Array<{
    id: number,
    flag?: string,
    name: string
  }>;
  selectedLanguage: {
    id: number,
    flag?: string,
    name: string
  };

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();
  user:User;
  constructor(private cartService:CartService,private cookieService: CookieService,
    private alertService: AlertService,private router: Router,private route: ActivatedRoute, private authService: AuthenticationService) {
    this.user = this.authService.currentUser();

    if(!JSON.parse(this.cookieService.getCookie('isClear'))){
      this.logout();
     }

     var getPathWhilePageReoload = window.location.hash;
     if(getPathWhilePageReoload == "#/"){
      this.authService.logout();
      this.router.navigate(['/account/login']);
     }
  }




  ngOnInit() {
    // get the notifications
    this._fetchNotifications();
    this.openMobileMenu = false;

  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
    // this.cartCountSubscription.unsubscribe();
  }

  /**
   * Change the language
   * @param language language
   */
  changeLanguage(language) {
    this.selectedLanguage = language;
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {

    Swal.fire({
      title: 'Are you sure you want to log out?',
     // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/account/login']);
      }
    })

  }




  /**
   * Fetches the notification
   * Note: For now returns the hard coded notifications
   */
  _fetchNotifications() {
    this.notificationItems = notificationItems;
  }





}
