import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { UIModule } from '../../shared/ui/ui.module'; 
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
     NgbAlertModule,
    // UIModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
