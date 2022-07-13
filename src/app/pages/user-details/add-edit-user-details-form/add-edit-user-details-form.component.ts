import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";  
import { ErrorMatcherService, errorMessages } from 'src/app/core/services/form-validation/form-validators.service';

@Component({
  selector: 'app-add-edit-user-details-form',
  templateUrl: './add-edit-user-details-form.component.html',
  styleUrls: ['./add-edit-user-details-form.component.css']
})
export class AddEditUserDetailsFormComponent implements OnInit {

  @Input('isShowErrors') isShowErrors: boolean;
  public matcher = new ErrorMatcherService();
  errors = errorMessages;  // Used on form html.

  public addEditForm: FormGroup;
  constructor(private fb: FormBuilder,) { }


    // convenience getter for easy access to form fields
    get f() {
      return this.addEditForm.controls;
    }
    
  ngOnInit() {
    this.addEditForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      user_email: ['',Validators.required],
      user_phone: ['',Validators.required],
      employee_id: [''],
      date_of_reg: [''],
      profile_img: [''],
      user_type: ['',Validators.required],
      user_status: ['']

    });
  }


}
