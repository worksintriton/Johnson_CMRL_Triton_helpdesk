import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '../shared/ui/ui.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StationDetailsModule } from './station-details/station-details.module';
import { JobNoDetailsModule } from './job-no-details/job-no-details.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { FaultTypeDetailsModule } from './fault-type-details/fault-type-details.module';
import { TicketDetailsModule } from './ticket-details/ticket-details.module';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';
import { NotificationDetailsModule } from './notification-details/notification-details.module';
import { ViewTicketDetailsComponent } from './view-ticket-details/view-ticket-details.component';
import { ViewTicketDetailsModule } from './view-ticket-details/view-ticket-details.module';



// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModules } from 'src/app/material.module';
import { ExceluploadComponent } from './excelupload/excelupload.component';
import { DeleteticketComponent } from './deleteticket/deleteticket.component';
import { AutocalculationComponent } from './autocalculation/autocalculation.component';
import { AutocalculationEscComponent } from './autocalculation-esc/autocalculation-esc.component';
import { CmrlautocalliftComponent } from './cmrlautocallift/cmrlautocallift.component';
import { CmrlautocalescComponent } from './cmrlautocalesc/cmrlautocalesc.component';
// import { AddEditTicketDetailsFormComponent } from './add-edit-ticket-details-form/add-edit-ticket-details-form.component';
// import { TicketDetailsComponent } from './ticket-details.component';
// import { AddTicketDetailsComponent } from './add-ticket-details/add-ticket-details.component';
// import { EditTicketDetailsComponent } from './edit-ticket-details/edit-ticket-details.component';




@NgModule({
  declarations: [DashboardComponent, ExceluploadComponent, DeleteticketComponent, AutocalculationComponent, AutocalculationEscComponent, CmrlautocalliftComponent, CmrlautocalescComponent],
  imports: [
    StationDetailsModule,
    JobNoDetailsModule,
    UserDetailsModule,
    FaultTypeDetailsModule,
    TicketDetailsModule,
    NotificationDetailsModule,
    ViewTicketDetailsModule,
    CommonModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    NgbDropdownModule,
    UIModule,
    PagesRoutingModule,
    AppMaterialModules,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
