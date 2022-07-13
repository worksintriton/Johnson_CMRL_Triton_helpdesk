import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from 'src/app/core/models/auth.models';
import { AdminModulesService } from 'src/app/core/services/admin/admin-modules.service';
import { AddEditUserDetailsFormComponent } from '../add-edit-user-details-form/add-edit-user-details-form.component';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-add-user-details',
  templateUrl: './add-user-details.component.html',
  styleUrls: ['./add-user-details.component.css'],
  providers: [DatePipe]
})
export class AddUserDetailsComponent implements OnInit {
  isShowErrors: boolean = false;
  @ViewChild(AddEditUserDetailsFormComponent,{ static: false })
  public addForm: AddEditUserDetailsFormComponent;
  user: User;
  UserList: any;
  constructor(public dialogRef: MatDialogRef<AddUserDetailsComponent>,
    private adminService:AdminModulesService, public datepipe: DatePipe,) { }

  ngOnInit() {
    this.adminService.getUserList().subscribe(async data=>{
      const response:any = data;
      this.UserList = await response['Data'];
    })
  }


  public save() {
    this.isShowErrors = true;
    if (this.addForm.addEditForm.valid) {

      let count = this.UserList.length;
      count = count + 1;
      let temp = count;
      console.log(temp);
      let date =  this.datepipe.transform(new Date(), 'yyyy-MM-dd');
      this.addForm.addEditForm.controls['date_of_reg'].setValue(date);
      this.addForm.addEditForm.controls['employee_id'].setValue(+temp);
      this.addForm.addEditForm.value.employee_id = temp;
      console.log(this.addForm.addEditForm.value);

      const enteredData = this.addForm.addEditForm.value;
        this.adminService.createUser(enteredData).subscribe(
          response => {
            this.success(response['Status']);
            this.dialogRef.close('Success');
          },
          (err: HttpErrorResponse) => {
            console.log("err",err)
            this.handleError(err);
          }
        )
      
    }
    else {
     
    }
  }

  private success(message) {
    Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: message, icon: 'success', });
    this.dialogRef.close('Success'); 
   // this.alertService.success('Saved successfully');
  }

  private handleError(error) {
    Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: error, icon: 'error', });
    this.dialogRef.close('Success');
  //  this.alertService.success(error);
  }

  reset() {
    this.addForm.addEditForm.reset();
  }

}

