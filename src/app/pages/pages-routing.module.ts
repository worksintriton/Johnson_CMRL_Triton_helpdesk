import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutocalculationEscComponent } from './autocalculation-esc/autocalculation-esc.component';
import { AutocalculationComponent } from './autocalculation/autocalculation.component';
import { CmrlautocalescComponent } from './cmrlautocalesc/cmrlautocalesc.component';
import { CmrlautocalliftComponent } from './cmrlautocallift/cmrlautocallift.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteticketComponent } from './deleteticket/deleteticket.component';
import { ExceluploadComponent } from './excelupload/excelupload.component';
import { FaultTypeDetailsComponent } from './fault-type-details/fault-type-details.component';
import { JobNoDetailsComponent } from './job-no-details/job-no-details.component';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';
import { StationDetailsComponent } from './station-details/station-details.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ViewTicketDetailsComponent } from './view-ticket-details/view-ticket-details.component';



const routes: Routes = [
   { path: 'dashboard', component: DashboardComponent },
   { path: 'station-details',  component: StationDetailsComponent },
   { path: 'job-no-details',  component: JobNoDetailsComponent },
   { path: 'user-details',  component: UserDetailsComponent },
   { path: 'fault-details',  component: FaultTypeDetailsComponent },
   { path: 'notification-details',  component: NotificationDetailsComponent },
   { path: 'ticket-details',  component: TicketDetailsComponent },
   { path: 'view-ticket-details',  component: ViewTicketDetailsComponent },
   { path: 'excelupload', component: ExceluploadComponent },
   { path: 'deleteticket', component: DeleteticketComponent },
   { path: 'autocalculator', component: AutocalculationComponent },
   { path: 'esc_autocalculator', component: AutocalculationEscComponent },

   { path: 'cmrl_autocalculator', component: CmrlautocalliftComponent },
   { path: 'cmrl_esc_autocalculator', component: CmrlautocalescComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
