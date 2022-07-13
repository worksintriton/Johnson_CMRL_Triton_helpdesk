import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";  
import { ErrorMatcherService, errorMessages } from 'src/app/core/services/form-validation/form-validators.service';

@Component({
  selector: 'app-add-edit-fault-type-details-form',
  templateUrl: './add-edit-fault-type-details-form.component.html',
  styleUrls: ['./add-edit-fault-type-details-form.component.css']
})
export class AddEditFaultTypeDetailsFormComponent implements OnInit {
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
      fault_type: ['',Validators.required],
      type: ['',Validators.required],
    });
  }


}
