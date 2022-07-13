import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ErrorInterceptor } from './core/helpers/error.interceptor';
// import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModules } from './material.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DatePipe } from '@angular/common';
import { LiftdetailComponent } from './liftdetail/liftdetail.component'


@NgModule({
  declarations: [
    AppComponent,
    LiftdetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,
    AppMaterialModules,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    DatePipe
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
