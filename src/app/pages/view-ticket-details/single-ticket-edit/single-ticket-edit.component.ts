import { Component, OnInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";  
import { ErrorMatcherService, errorMessages } from 'src/app/core/services/form-validation/form-validators.service';
import { AdminModulesService } from 'src/app/core/services/admin/admin-modules.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-single-ticket-edit',
  templateUrl: './single-ticket-edit.component.html',
  styleUrls: ['./single-ticket-edit.component.css']
})
export class SingleTicketEditComponent implements OnInit {
  @Input('isShowErrors') isShowErrors: boolean;
  public matcher = new ErrorMatcherService();
  errors = errorMessages;  // Used on form html.

  public addEditForm: FormGroup;
  constructor(public datepipe: DatePipe,private adminService:AdminModulesService,@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,public dialogRef: MatDialogRef<SingleTicketEditComponent>,) { }


    // convenience getter for easy access to form fields
    get f() {
      return this.addEditForm.controls;
    }
    
  ngOnInit() {
    this.addEditForm = this.fb.group({
      date_of_create: ['',Validators.required],
    });
  }

  public save() {

    this.isShowErrors = true;
    if (this.addEditForm.valid) {
      const enteredData = this.addEditForm.value;
        enteredData._id = this.data._id;
        // enteredData.date_of_create = enteredData.date_of_create+":06.253Z";
        // console.log(new Date("2021-08-18T04:42:06.253Z").getUTCDate().toString());
        // enteredData.date_of_create  = this.datepipe.transform(new Date(enteredData.date_of_create), 'dd-MM-yyyy h:mm a');
        console.log(enteredData);
        this.adminService.updatetickettime(enteredData).subscribe(
          response => {
            this.success(response);
            this.dialogRef.close('Success');
            window.location.reload();
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


}
