import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'src/app/core/services/cookie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserProfileService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/auth.models';
import { CustomerService } from 'src/app/core/services/customer/customer.service';
import { AdminModulesService } from 'src/app/core/services/admin/admin-modules.service';
import { AddEditJobNoDetailsFormComponent } from '../add-edit-job-no-details-form/add-edit-job-no-details-form.component';

@Component({
  selector: 'app-edit-job-no-details',
  templateUrl: './edit-job-no-details.component.html',
  styleUrls: ['./edit-job-no-details.component.css']
})
export class EditJobNoDetailsComponent implements OnInit {
  isShowErrors: boolean = false;
  @ViewChild(AddEditJobNoDetailsFormComponent,{ static: false })
  editForm: AddEditJobNoDetailsFormComponent;
  user: User;
  private _id: any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EditJobNoDetailsComponent>,
  private adminService:AdminModulesService,) {}

  ngOnInit() {
    var datas = this.data;
    this._id =this.data._id;
    setTimeout(() => {
      this.fillForm(datas);
    }, 200);
  }

private fillForm(parsedData) {

  this.editForm.addEditForm.patchValue({
    station_id:parsedData.station_id,
    job_no:parsedData.job_no,
    serving_level:parsedData.serving_level,
    unique_id:parsedData.unique_id,
    createdAt:parsedData.createdAt,
    
  });
}


public update() {

  this.isShowErrors = true;
  if (this.editForm.addEditForm.valid) {
    const enteredData = this.editForm.addEditForm.value;
     console.log(enteredData);
      enteredData.id = this.data._id;
      enteredData.created_date = enteredData.created_date+"T00:00:00.000Z";
      this.adminService.updatejobno(enteredData).subscribe(
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
