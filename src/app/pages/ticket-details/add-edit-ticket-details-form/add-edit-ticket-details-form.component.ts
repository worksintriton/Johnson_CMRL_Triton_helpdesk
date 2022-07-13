import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";  
import { ErrorMatcherService, errorMessages } from 'src/app/core/services/form-validation/form-validators.service';
import { AdminModulesService } from 'src/app/core/services/admin/admin-modules.service';

@Component({
  selector: 'app-add-edit-ticket-details-form',
  templateUrl: './add-edit-ticket-details-form.component.html',
  styleUrls: ['./add-edit-ticket-details-form.component.css']
})
export class AddEditTicketDetailsFormComponent implements OnInit {


  faults_list  = [];
  error : any;

  @Input('isShowErrors') isShowErrors: boolean;
  public matcher = new ErrorMatcherService();
  errors = errorMessages;  // Used on form html.

  public addEditForm: FormGroup;
  Station_list: any;
  constructor(private fb: FormBuilder,private adminService:AdminModulesService,) { }


    // convenience getter for easy access to form fields
    get f() {
      return this.addEditForm.controls;
    }
    
    
    ngOnInit() {
      this.addEditForm = this.fb.group({
        fault_type: ['',Validators.required],
      });
      this.getAllfaults();
    }


    getAllfaults(){
      this.adminService.getfaultList().pipe()
      .subscribe( data => {
          console.log("data ",data);
          this.faults_list = data['Data'];
        },error => {
          this.error = error;
        });
    }
    

}
