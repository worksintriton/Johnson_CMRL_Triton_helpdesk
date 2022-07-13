import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ErrorMatcherService, errorMessages } from 'src/app/core/services/form-validation/form-validators.service';
import { AdminModulesService } from "src/app/core/services/admin/admin-modules.service";


@Component({
  selector: 'app-excelupload',
  templateUrl: './excelupload.component.html',
  styleUrls: ['./excelupload.component.css']
})
export class ExceluploadComponent implements OnInit {


  station_list = [];
  job_list = [];
  fault_type = [];
  user_list = [];
  ticket_list = [];
  error = '';
  job_ids = '';
  status_list = ['Completed','Inprogress','Closed'];


  @Input('isShowErrors') isShowErrors: boolean;
  public matcher = new ErrorMatcherService();
  errors = errorMessages;  // Used on form html.

  public addEditForm: FormGroup;
  constructor(private fb: FormBuilder,private adminService:AdminModulesService) {

    this.get_station_list();
    this.get_job_list();
    this.get_fault_type();
    this.get_user_list();
    this.get_ticket_list();

   }


    // convenience getter for easy access to form fields
    get f() {
      return this.addEditForm.controls;
    }

  ngOnInit() {
    this.addEditForm = this.fb.group({
      date_of_create: [''],
      job_id:[''],
      break_down_reported_by: [''],
      break_down_observed: [''],
      fault_type: [''],
      ticket_no : [''],
      comments : [''],
    });
  }

  get_station_list(){
    this.adminService.getstationList().pipe()
    .subscribe( data => {
        this.station_list = data['Data'];
      },error => {
        this.error = error;
      });
  }

  get_job_list(){
    this.adminService.getjobnoList().pipe()
    .subscribe( data => {
        this.job_list = data['Data'];
        // this.loadRecord();
      },error => {
        this.error = error;
      });
  }

  get_fault_type(){
    let a = {
     type : 2
    }
    this.adminService.getlist_by_type(a).pipe()
    .subscribe( data => {
        this.fault_type = data['Data'];
        // this.loadRecord();
      },error => {
        this.error = error;
      });
  }


  get_user_list(){
    this.adminService.getUserList().pipe()
    .subscribe( data => {
        this.user_list = data['Data'];
        // this.loadRecord();
      },error => {
        this.error = error;
      });
  }

  get_ticket_list(){
    this.adminService.getstationBasedTicketList().pipe()
    .subscribe( async data => {
        this.ticket_list = data['Data'];
      },error => {
        this.error = error;
      });
  }

  close(){

  }

  save(){
    const enteredData = this.addEditForm.value;
    for(let a  = 0 ; a < this.job_list.length; a ++){
       if(enteredData.job_id == this.job_list[a].job_no){
         this.job_ids = this.job_list[a]._id;
       }
       if(a == this.job_list.length - 1){
         this.save1();
       }
    }
  }

  save1(){
    const enteredData = this.addEditForm.value;
    var station_id = '';
    for(let c = 0; c < this.job_list.length; c ++){
      if(this.job_list[c]._id == this.job_ids){
        station_id = this.job_list[c].station_id._id
      }
      if(c == this.job_list.length - 1){
        let a = {
          "date_of_create": enteredData.date_of_create,
          "station_id": station_id,
          "job_id": this.job_ids,
          "break_down_reported_by":"6124c2a5c7b89e53a8077d00",
          "break_down_observed":enteredData.break_down_observed,
          "type":"2",
          "fault_type":'Others',
          "image_list":[]
          }
          console.log(a);
          this.adminService.ticketcreate(a).pipe()
          .subscribe( async data => {
              var datas = data['Data'];
              console.log(datas.ticket_no);
              this.addEditForm.controls['ticket_no'].setValue(datas.ticket_no);
              alert('Added Successfully');
            },error => {
              this.error = error;
            });

          console.log(this.addEditForm.value);
      }
    }
  }

  save2(){
    const enteredData = this.addEditForm.value;
    console.log(enteredData);


    let a = {
      "date_of_create": enteredData.date_of_create,
      "ticket_no": enteredData.ticket_no,
      "ticket_status":"Closed",
      "ticket_comments":enteredData.comments,
      "ticket_photo":[],
      "user_id":"6124c2a5c7b89e53a8077d00",
      }
      console.log(a);
      this.adminService.ticketupdate(a).pipe()
      .subscribe( async data => {
          let datas = data['Data'];
          console.log(datas);
          alert('Updated Successfully');
          this.addEditForm.controls['date_of_create'].setValue('');
          this.addEditForm.controls['job_id'].setValue('');
          this.addEditForm.controls['break_down_reported_by'].setValue('');
          this.addEditForm.controls['break_down_observed'].setValue('');
          this.addEditForm.controls['fault_type'].setValue('');
          this.addEditForm.controls['comments'].setValue('');
          this.addEditForm.controls['ticket_no'].setValue('');
        },error => {
          this.error = error;
        });
  }

  Check_JobId(){
    const enteredData = this.addEditForm.value;
    for(let a  = 0 ; a < this.job_list.length; a ++){
      console.log(enteredData.job_id,this.job_list[a].job_no);
       if(enteredData.job_id == this.job_list[a].job_no){
         this.job_ids = this.job_list[a]._id;
       }
       if(a == this.job_list.length - 1){
        //  this.save1();
        if(this.job_ids == ''){
        this.error = 'Value not Found';
        }else{
          this.error = 'Value Found';
        }
       }
    }

  }


}
