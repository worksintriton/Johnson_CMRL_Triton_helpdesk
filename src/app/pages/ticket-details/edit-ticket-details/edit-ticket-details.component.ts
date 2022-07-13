import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from 'src/app/core/models/auth.models';
import { AddEditTicketDetailsFormComponent } from '../add-edit-ticket-details-form/add-edit-ticket-details-form.component';
import { AdminModulesService } from 'src/app/core/services/admin/admin-modules.service';

@Component({
  selector: 'app-edit-ticket-details',
  templateUrl: './edit-ticket-details.component.html',
  styleUrls: ['./edit-ticket-details.component.css']
})
export class EditTicketDetailsComponent implements OnInit {

  isShowErrors: boolean = false;
  @ViewChild(AddEditTicketDetailsFormComponent,{ static: false })
  editForm: AddEditTicketDetailsFormComponent;
  user: User;
  private _id: any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EditTicketDetailsComponent>,
  private adminService:AdminModulesService,) {}

  ngOnInit() {

    var datas = this.data;
    this._id =this.data._id;
    setTimeout(() => {
      this.fillForm(datas);
    }, 200);
  }

private fillForm(parsedData) {
  console.log("test");
  this.editForm.addEditForm.patchValue({
    fault_type: parsedData.fault_type
  });
}


public update() {
  this.isShowErrors = true;
  if (this.editForm.addEditForm.valid) {
    const enteredData = this.editForm.addEditForm.value;
      enteredData._id = this.data._id;
      console.log("Enter Data",enteredData);
      this.adminService.ticketdetailupdate(enteredData).subscribe(
        response => {
          this.success(response);
          this.dialogRef.close('Success');
        },
        (err: HttpErrorResponse) => {
          this.handleError(err.error.message);
        }
      )
  }
  else {

  }
}

private success(message) {
  Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: message['Status'], icon: 'success', });
  this.dialogRef.close('Success');
 // this.alertService.success('Saved successfully');
}

private handleError(error) {
  Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: error, icon: 'error', });
  this.dialogRef.close('Success');
//  this.alertService.success(error);
}

reset() {
  this.editForm.addEditForm.reset();
}


}
