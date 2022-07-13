import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminModulesService } from 'src/app/core/services/admin/admin-modules.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-deleteticket',
  templateUrl: './deleteticket.component.html',
  styleUrls: ['./deleteticket.component.css']
})
export class DeleteticketComponent implements OnInit {

   ticket_no  = '';

  constructor(private adminService:AdminModulesService) { }

  ngOnInit() {
  }

  delete_action(){
    let a = {
      "ticket_no": this.ticket_no,
      "delete_status": true,
    }
    this.adminService.ticketdelete(a).subscribe(
      response => {
        console.log(response);
        this.success(response['Status']);
        // this.dialogRef.close('Success');
      },
      (err: HttpErrorResponse) => {
        console.log("err",err)
        this.handleError(err);
      }
    )
  }

  revert_action(){
    let a = {
      "ticket_no": this.ticket_no,
      "delete_status": false,
    }
    this.adminService.ticketdelete(a).subscribe(
      response => {
        this.success(response['Status']);
        // this.dialogRef.close('Success');
      },
      (err: HttpErrorResponse) => {
        console.log("err",err)
        this.handleError(err);
      }
    )
  }


  private success(message) {
    Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: message, icon: 'success', });
    // this.dialogRef.close('Success');
   // this.alertService.success('Saved successfully');
  }

  private handleError(error) {
    Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: error, icon: 'error', });
    // this.dialogRef.close('Success');
  //  this.alertService.success(error);
  }


}
