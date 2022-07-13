// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AdminModulesService } from 'src/app/core/services/admin/admin-modules.service';
import { CookieService } from 'src/app/core/services/cookie.service';


import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { MatTableAttributes, DateFormat } from "../../common/ui.constant";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from "src/app/core/services/auth.service";
import { User } from "src/app/core/models/auth.models";
import { AdminModulesService } from "src/app/core/services/admin/admin-modules.service";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { ExportToExcelService } from "src/app/core/services/exportExcel/export-to-excel.service";
import { FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
export class Product {
  break_down_observed: string;
  break_down_time: string;
  restored_time:string;
  ram:string;
  status:string;
  type:string;
  duration:string;
  fault_type:string;
  createdDate: string;
  updatedDate: string;
  ticket_no:string;
  station_name:string
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 * Dashboard component - handling dashboard with sidear and content
 */
export class DashboardComponent implements OnInit {

  table_visible = false;

  @ViewChild('test1', { static: false }) content: ElementRef;
  testAttributesMap = new Map();
  public formGroup: FormGroup;
  PAGE_SIZE = MatTableAttributes.PAGE_SIZE;
  PAGINATION_RANGE = MatTableAttributes.PAGINATION_RANGE;
  DATE_FORMAT = DateFormat.DATE_FORMAT;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  error = '';
  List:any;
  dynamicTableData: any[];
  user: User;
  station_id: any;
  Days: any = '';
  ram: any;
  stationList: any;
  minFromDate = new Date();
  minEndDate = new Date();
  faultTypeList: any;






  icon:any;
  color:any;
  fault_count: any;
  ticketLiftsCount: any;
  ticketElsCount: any;
  numUserLogin: any;
  jonsonCount: any;
  cmrlCount: any;
  iscmrl_user: boolean =false;
  isTicketStatus: boolean =false;
  left_Completed: any;
  left_InCompleted: any;
  left_Close: any;
  left_Open: any;
  ESCALATORS_Completed: any;
  ESCALATORS_InCompleted: any;
  ESCALATORS_Close: any;
  ESCALATORS_Open: any;
  left_Pending: any;
  ESCALATORS_Pending: any;


  constructor(private adminService:AdminModulesService,private router: Router,private cookieService: CookieService, private exportToExcelService: ExportToExcelService,
    private route: ActivatedRoute, private fb: FormBuilder,)
  {
    //  if(!JSON.parse(this.cookieService.getCookie('currentUser'))){
    //   this.router.navigate(['./']);
    //  }
   }

   public displayedColumns: string[] = ['ticket_no','break_down_observed','type','break_down_time','restored_time','duration','ram','status','station_name','fault_type','createdDate', "actions"];
   public displayedLabelColumns: string[] = ['ticket no','break down observed','type','break down time','restored time','duration','RAM','status','station name','fault type','created Date',  'Action'];
   dataSource: MatTableDataSource<Product>;

 ngOnInit() {
  this.getAllDasboardDetails();

  this.getstationList();
   this.getAllRecords();

   var currentDate = new Date();
   var beforeMonthDate = currentDate.setMonth(currentDate.getMonth() - 1);
   this.formGroup = this.fb.group({
    startDate: [new Date(beforeMonthDate), Validators.required],
    endDate: [new Date(), Validators.required],

  });


 }

 getAllDasboardDetails(){
   this.adminService.getAllDasboardDetails().pipe()
   .subscribe( data => {
       console.log("getAllDasboardDetails ",data);
       this.fault_count = data['Data'].fault_count;
       this.ticketLiftsCount = data['Data'].ticketLiftsCount;
       this.ticketElsCount = data['Data'].ticketElsCount;
       this.numUserLogin = data['Data'].numUserLogin;
       this.jonsonCount = data['Data'].jonsonCount;
       this.cmrlCount = data['Data'].cmrlCount;


       this.left_Completed = data['Data'].left_Completed
       this.left_InCompleted = data['Data'].left_InCompleted;
       this.left_Close = data['Data'].left_Close
       this.left_Open = data['Data'].left_Open;
       this.left_Pending = data['Data'].left_Pending

       this.ESCALATORS_Completed = data['Data'].ESCALATORS_Completed
       this.ESCALATORS_InCompleted = data['Data'].ESCALATORS_InCompleted;
       this.ESCALATORS_Close = data['Data'].ESCALATORS_Close
       this.ESCALATORS_Open = data['Data'].ESCALATORS_Open;
       this.ESCALATORS_Pending =  data['Data'].ESCALATORS_Pending

     },error => {

     });
 }

 userStatus(status){
   if(status == "Lifts"){
    this.iscmrl_user = true;
    this.isTicketStatus = false;
   }
   else if(status == "Escalators"){
    this.iscmrl_user = false;
    this.isTicketStatus = true;
   }else if (status == "faults"){
    this.router.navigate(['/fault-details']);
   }else{
    this.iscmrl_user = false;
    this.isTicketStatus = false;
   }

 }



 getstationList(){
  this.adminService.getstationList().pipe()
  .subscribe( data => {
      this.stationList = data['Data'];
      // console.log("this.stationList",this.stationList);
    },error => {
      this.error = error;
    });
}

getAllRecords(){

  this.adminService.getstationBasedTicketList().pipe()
  .subscribe( async data => {
      console.log("data ",data);
      this.List = data['Data'];

    await this.List.forEach(tic_element => {
        this.stationList.forEach(station_element => {
        if(tic_element.station_id == station_element._id){
          tic_element.station_name = station_element.station_name;
        }
        })

      });

      this.faultTypeList = this.List.reduce((unique, o) => {
        if(!unique.some(obj => obj.fault_type.toLowerCase() === o.fault_type.toLowerCase())) {
          unique.push(o);
        }
        return unique;
    },[]);



      console.log("this.List ",this.List);
      this.loadRecord();
    },error => {
      this.error = error;
    });
}

dateformat(data){
  if(data){
    let dbdate = data;
    let temp1 = dbdate.split(" ");
    let temp2 = temp1[0].split("-");
    let temp3 = temp1[1].split(":");
    let temp4 = +temp3[0]
    if(temp1[2] == "PM" || temp1[2] == "AM"){
      temp4 = +temp4 + 12;
    }
    let final = temp2[2]+"-"+temp2[1]+"-"+temp2[0]+"T"+temp4+":"+temp3[1]+":00.000Z";
    return final;
  }
}


 millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return (  parseInt(seconds) == 60 ?
    (minutes+1) + ":00" :
    minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds)
}

loadRecord() {

  this.dynamicTableData = [];
  this.List.forEach(element => {

      if(element.break_down_time && element.restored_time){
        var inputJSON = {
          "created_date": this.dateformat(element.break_down_time.toUpperCase()),
          "current_time": this.dateformat(element.restored_time.toUpperCase())
        };
      function getDataDiff(startDate, endDate) {
          var diff = endDate.getTime() - startDate.getTime();
          var days = Math.floor(diff / (60 * 60 * 24 * 1000));
          var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
          var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
          var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
          return { day: days, hour: hours, minute: minutes, second: seconds };
      }
      var diff = getDataDiff(new Date(inputJSON.created_date), new Date(inputJSON.current_time));
      var duration  = diff.day+ " Day : " + diff.hour + " Hour : " + diff.minute + " Minute " ;
      if(diff.day == 1){
        if(diff.minute > 1){
          this.ram = ( diff.hour + 1) * 500;
        }else{
          this.ram =  diff.hour * 500  ;
        }

      }else if(diff.day > 1){

        if(diff.minute > 1){
          this.ram = diff.day * 12000 + ( diff.hour + 1) * 500;
          this.ram = this.ram - 12000 ;
        }else{
          this.ram = diff.day * 12000 + diff.hour  * 500 ;
          this.ram = this.ram - 12000 ;
        }



      }else{
        this.ram = " - " ;
      }
      }else{
        this.ram = " - ";
        duration = " - "
      }

    let temp = '';
    let temp2 = '';
    if(element.fault_type == 'Lift not working'){
      temp = this.ram.toLocaleString('en-IN')
      temp2 = duration
    }
    let row: Product = {
      break_down_observed: element.break_down_observed,
      type: element.type && element.type == 1 ?  "LIFT" : "ESCALATORS",
      break_down_time:element.break_down_time,
      restored_time:element.restored_time,
      duration:temp2,
      status:element.status,
      ram : temp,
      fault_type:element.fault_type,
      createdDate: element.createdAt,
      updatedDate: element.updatedAt,
      ticket_no:element.ticket_no,
      station_name:element.station_name
    }
    this.dynamicTableData.push(row);
  })
  this.dataSource = new MatTableDataSource(this.dynamicTableData);
  setTimeout(() => this.dataSource.paginator = this.paginator);
  // this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

// applyFilter(event: Event) {
//   const filterValue = (event.target as HTMLInputElement).value;
//   this.dataSource.filter = filterValue.trim().toLowerCase();
// }


 // Reditrect
 viewRecord(ticket_no) {

  let navigationExtras: NavigationExtras = {
    queryParams: { ticket_no: ticket_no }
  };

  // Navigate to the view manage test page with extras
  this.router.navigate(['/view-ticket-details'], navigationExtras);
}

exportAsXLSX(): void {
  let new_list = this.dataSource.filteredData.map(function(obj) {
    return {
      "Ticket No": obj.ticket_no,
      "Break Down Observed":obj.break_down_observed,
      "Restored Time":obj.restored_time,
      "Duration":obj.duration,
      "Penalty Amount" : obj.ram,
      "Status":obj.status,
      "Fault Type":obj.fault_type,
      "Created Date":new Date(obj.createdDate),
      "Updated Date":new Date(obj.updatedDate),
    }
  });
  this.exportToExcelService.exportAsExcelFile(new_list, "Ticket Details",);
}


  // form group
  filterForm = new FormGroup({
    station_name: new FormControl(),
    fault_type: new FormControl(),
    status: new FormControl(),
    type: new FormControl(),
  });

  get station_name() { return this.filterForm.get('station_name'); }
  get fault_type() { return this.filterForm.get('fault_type'); }
  get status() { return this.filterForm.get('status'); }
  get type() { return this.filterForm.get('type'); }

  isArray = function(a) {
      return (!!a) && (a.constructor === Array);
  };
  isObject = function(a) {
      return (!!a) && (a.constructor === Object);
  };
getFormsValue(status,type) {
  this.table_visible = true;
  const filterValues = {
    status: status,
    type: type,
  }

  this.dataSource.filterPredicate = (data, filter) => {
    let displayData = true;
    let myFilter = JSON.parse(filter);

    for (var key in myFilter) {
      if(myFilter[key]){
        if(typeof myFilter[key] === "string"){
          if(data[key] != myFilter[key]){
            displayData = false;
          }
        }
        if(this.isArray(myFilter[key])){
          if (!myFilter[key].includes(data[key])) {
            displayData = false;
          }
        }
      }
    }
    return displayData;
  }

  this.dataSource.filter = JSON.stringify(filterValues);
}

clearForm(){
  this.dataSource.filter = JSON.stringify({});
  this.filterForm.reset();
}

filterDatasClearForm(){
  this.getAllRecords();
}

submitData(){
  this.adminService.getFilterDatas(this.formGroup.value).pipe()
  .subscribe( data => {
      console.log("getFilterDatas ",data);
      this.List = data['Data'];
      this.loadRecord();
    },error => {
      this.error = error;
    });
}

setEndDateMinValue() {

  this.minEndDate = this.formGroup.controls.startDate.value;
}

}


