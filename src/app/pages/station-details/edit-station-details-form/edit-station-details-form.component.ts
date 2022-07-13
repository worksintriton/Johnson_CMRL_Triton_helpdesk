import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'src/app/core/services/cookie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserProfileService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/auth.models';
import { CustomerService } from 'src/app/core/services/customer/customer.service';
import { AddEditStationDetailsFormComponent } from '../add-edit-station-details-form/add-edit-station-details-form.component';
import { AdminModulesService } from 'src/app/core/services/admin/admin-modules.service';

@Component({
  selector: 'app-edit-station-details-form',
  templateUrl: './edit-station-details-form.component.html',
  styleUrls: ['./edit-station-details-form.component.css']
})
export class EditStationDetailsFormComponent implements OnInit {
  isShowErrors: boolean = false;
  @ViewChild(AddEditStationDetailsFormComponent,{ static: false })
  editForm: AddEditStationDetailsFormComponent;
  user: User;
  private _id: any;
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EditStationDetailsFormComponent>,
  private authService: AuthenticationService,
  private adminService:AdminModulesService,) { this.user = this.authService.currentUser();}

  ngOnInit() {
    var datas = this.data;
    this._id =this.data._id;
    setTimeout(() => {
      this.fillForm(datas);
    }, 200);
  }

private fillForm(parsedData) {
  this.editForm.addEditForm.patchValue({
    station_name: parsedData.station_name,
    type: parsedData.type &&  parsedData.type == "LIFT" ?  1 : 2, 
  });
}


public update() {
  this.isShowErrors = true;
  if (this.editForm.addEditForm.valid) {
    const enteredData = this.editForm.addEditForm.value;
  
      enteredData.id = this.data._id;
      this.adminService.updatestation(enteredData).subscribe(
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
