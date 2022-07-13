import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";  
import { ErrorMatcherService, errorMessages } from 'src/app/core/services/form-validation/form-validators.service';
import { AdminModulesService } from 'src/app/core/services/admin/admin-modules.service';

@Component({
  selector: 'app-add-edit-job-no-details-form',
  templateUrl: './add-edit-job-no-details-form.component.html',
  styleUrls: ['./add-edit-job-no-details-form.component.css']
})
export class AddEditJobNoDetailsFormComponent implements OnInit {

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
      job_no: ['',Validators.required],
      // type: ['',Validators.required],
      unique_id:['',Validators.required],
      serving_level:['',Validators.required],
      station_id:['',Validators.required],
      created_date:['',Validators.required],
    });

    this.adminService.getstationList().subscribe(async data=>{
      const response:any = data;
      console.log(data);
      console.log(response);
      if (response['Status']) {
        this.Station_list = await response['Data'];
      } else {
        this.Station_list = [];
      }
    });
  }


  

}
