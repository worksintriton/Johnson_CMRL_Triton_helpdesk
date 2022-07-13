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
import { DatePipe } from '@angular/common'

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
  station_name:string;
  job_detail : string;
  lift_breakdown_time:string;
}
@Component({
  selector: 'app-cmrlautocallift',
  templateUrl: './cmrlautocallift.component.html',
  styleUrls: ['./cmrlautocallift.component.css']
})
export class CmrlautocalliftComponent implements OnInit {



  constructor(private adminService:AdminModulesService, private exportToExcelService: ExportToExcelService,
    private route: ActivatedRoute,private router :Router, private fb: FormBuilder,public datepipe: DatePipe)
   {
 
   }



  lift_count = 0;
  lift_breakdown_time  = '';


  timeLeft: number = 2;
  interval;


  total_operation_time = 0;
  no_of_days = 0;
  lift_operation_time = 0;
  lift_quantity = 0;
  total_up_time = 0;
  total_down_time = 0;
  mtbma = 0;
  no_of_breakdown = 0;
  mtbf = 0;
  mttr = 0;
  availability = 0;
  no_of_months = 0;
  call_out_ratio = 0;
  selectedDate = this.datepipe.transform(new Date(), 'yyyy-MM');;

  start_date = '';
  end_date = '';




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
  history_record = [];
  loader_show = false;
  final_data = [];
  jobNumberList = [];


  public displayedColumns: string[] = ['ticket_no','break_down_observed','lift_breakdown_time','type','break_down_time','restored_time','duration','ram','status','station_name','fault_type','createdDate'];
  public displayedLabelColumns: string[] = ['ticket no','CMRL comments','lift_breakdown_time','type','break down time','restored time','duration','RAM','status','station name','fault type','created Date'];
  dataSource: MatTableDataSource<Product>;

  ngOnInit() {
   this.getstationList();
   this.getAllRecords();
   this.get_count_lift();


   

   var date = new Date();
   var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
   var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

   this.selectedDate = ""+date;
   var currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
   var beforeMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
   this.formGroup = this.fb.group({
    startDate: [beforeMonthDate, Validators.required],
    endDate: [currentDate, Validators.required],
  });
  this.startTimer();

  }

  getstationList(){

    this.adminService.getstationList().pipe()
    .subscribe( data => {
        this.stationList = data['Data'];
      },error => {
        this.error = error;
      });

      this.getJoblist();

  }

  getJoblist(){
    this.jobNumberList = [];
    var date = new Date(this.selectedDate);
    var firstDay = new Date("2000-01-01T00:00:00.000Z");
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.adminService.getjobnoList().pipe()
    .subscribe( data => {
           let temp_data = data['Data'];
           console.log(temp_data.length);
           temp_data.forEach(element => {
             var from = new Date(firstDay);
             var to   = new Date(lastDay);
             var check = new Date(element.created_date);
             if(check >= from && check <= to){
              if(element.station_id.type == '1'){
                this.jobNumberList.push(element);
              }
             }
           });
        // this.loadRecord();
      },error => {
        this.error = error;
      });
  }


  

  getAllRecords(){
    this.loader_show = true;
    this.adminService.getstationBasedTicketList().pipe()
    .subscribe( async data => {
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
      let temp4 = +temp3[0];
      if(temp1[2] == "PM"){
        if(12 !== temp4){
          temp4 = +temp4 + 12;
        }
      }
      let datas = temp4.toString().padStart(2, '0')
      let final = temp2[2]+"-"+temp2[1]+"-"+temp2[0]+"T"+datas+":"+temp3[1]+":00.000Z";
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
        if(element.fault_type == 'Lift not working' && element.type == '1'){
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
        let val = diff.day * 24;
        val = diff.day * 24;
        val = val + diff.hour;
        val = val + diff.minute / 60;
        this.lift_breakdown_time = ""+val;
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
      if(element.fault_type == 'Lift not working' || element.fault_type == 'Escalator not working'){
        temp = this.ram.toLocaleString('en-IN')
        temp2 = duration
      }
      element.lift_breakdown_time = this.lift_breakdown_time;
      let row: Product = {
        break_down_observed: element.break_down_observed,
        type: element.type && element.type == 1 ?  "LIFT" : "ESCALATORS",
        break_down_time:element.break_down_time,
        restored_time:element.restored_time,
        duration:temp2,
        status:element.status,
        ram : temp,
        fault_type:element.fault_type,
        createdDate: element.create_date_time,
        updatedDate: element.updatedAt,
        ticket_no:element.ticket_no,
        station_name:element.station_detail.station_name,
        job_detail:element.job_detail.job_no,
        lift_breakdown_time : ""+Math.round(+this.lift_breakdown_time)
      }
      this.dynamicTableData.push(row);
    }

    });
    // this.historyPrint(this.dynamicTableData);
    this.dataSource = new MatTableDataSource(this.dynamicTableData);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.final_data = this.dataSource.filteredData;
    this.getFormsValue();
    this.get_hrs_count();
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
        "CMRL Comments":obj.break_down_observed,
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





  getFormsValue() {

    const filterValues = {
      station_name: this.station_name.value,
      fault_type: this.fault_type.value,
      status: this.status.value,
      type: this.type.value,
    }
    if(filterValues.station_name !== null){
    if(filterValues.station_name.length == 0){
      filterValues.station_name = null;
    }
    }
    if(filterValues.fault_type !== null){
      if(filterValues.fault_type.length == 0){
        filterValues.fault_type = null;
      }
      }
      if(filterValues.status !== null){
        if(filterValues.status.length == 0){
          filterValues.status = null;
        }
        }
        if(filterValues.type !== null){
          if(filterValues.type.length == 0){
            filterValues.type = null;
          }
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

    this.final_data = this.dataSource.filteredData;

    if(this.final_data.length == 0){
      this.loader_show = false;
    }
    this.historyPrint(this.dataSource.filteredData);
  }

  clearForm(){
    this.dataSource.filter = JSON.stringify({});
    this.filterForm.reset();
  }

  filterDatasClearForm(){
    this.getAllRecords();
  }

  submitData() {
 

  


   var date = new Date(this.selectedDate);
   var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
   var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.formGroup.controls['startDate'].setValue(firstDay);
    this.formGroup.controls['endDate'].setValue(lastDay);


   this.loader_show = true;
   let values = this.formGroup.value;

   if(values.startDate == ''){
    alert("Please Select Start Date")
   }
    else if(values.endDate == ''){
      alert("Please Select End Date")
   }else {

    this.getJoblist();

    // this.formGroup.controls['fault_type'].setValue('Lift not working');
    // this.formGroup.controls['type'].setValue('LIFT');




    this.adminService.getFilterDatas(this.formGroup.value).pipe()
    .subscribe( data => {
        this.List = data['Data'];
        this.loadRecord();
      },error => {
        this.error = error;
      });
   }
  }


  historyPrint(records){
    let data = [];
    for(let a = 0 ; a < records.length; a++){
      data.push(records[a].ticket_no);
    }
    let a = {
      data : data
     }
    this.adminService.getFilterDatas_alldata(a).pipe()
    .subscribe( (data:any) => {
      var datas = data.Data;
      var final_data = [];
      for(let d = 0 ;d < datas.length; d++ ){
        let a = {
          tik_no : '-',
          fault_type : '-',
          cmrl_cmts : '-',
          jlpl_comments_o : '-',
          status_o : '-',
          update_at_o : '-',
          jlpl_comments_i : '-',
          status_i : '-',
          update_at_i : '-',
          jlpl_comments_p : '-',
          status_p : '-',
          update_at_p : '-',
          jlpl_comments_c : '-',
          status_c : '-',
          update_at_c : '-',
          jlpl_comments_cls : '-',
          status_cls : '-',
          update_at_cls : '-',
        }
      let e = datas[d];
      for(let c = 0 ;c < e.length; c++){
       if(e[c].ticket_status == 'Open'){
        a.tik_no = e[c].ticket_no,
        a.fault_type = '',
        a.cmrl_cmts = e[c].ticket_comments,
        a.jlpl_comments_o =  e[c].ticket_comments,
        a.status_o = e[c].ticket_status
        a.update_at_o = e[c].date_of_create
       }

       if(e[c].ticket_status == 'Close'){
        a.jlpl_comments_cls =  e[c].ticket_comments,
        a.status_cls = e[c].ticket_status
        a.update_at_cls = e[c].date_of_create
       }

       if(e[c].ticket_status == 'Completed'){
        a.jlpl_comments_c =  e[c].ticket_comments,
        a.status_c = e[c].ticket_status
        a.update_at_c = e[c].date_of_create
       }

       if(e[c].ticket_status == 'Inprogress'){
        a.jlpl_comments_i =  e[c].ticket_comments,
        a.status_i = e[c].ticket_status
        a.update_at_i = e[c].date_of_create
       }

       if(e[c].ticket_status == 'Pending'){
        a.jlpl_comments_p =  e[c].ticket_comments,
        a.status_p = e[c].ticket_status
        a.update_at_p = e[c].date_of_create
       }
      }
      final_data.push(a);
       if(d == datas.length - 1){
      this.final_data = this.dataSource.filteredData;
      this.final_output(final_data,this.dynamicTableData);
       }
      }
        // this.List = data['Data'];
        // this.loadRecord();
      },error => {
        this.error = error;
      });
  }


  final_output(data1,data2){
   var final_data = [];
   for(let a  = 0; a < data1.length; a++ ){
    for(let c = 0 ; c < data2.length; c++){
      if(data1[a].tik_no == data2[c].ticket_no){
        let js = {
          ticket_no : data2[c].ticket_no,
          fault_type : data2[c].fault_type,
          cmrl_comments : data2[c].break_down_observed,
          duration : data2[c].duration,
          ram :  data2[c].ram,
          current_status : data2[c].status,
          completed_date : data2[c].updatedDate,
          created_at : data2[c].createdDate,
          last_updated : data2[c].updatedDate,
          jlpl_comments_o : data1[a].jlpl_comments_o,
          status_o : data1[a].status_o,
          update_at_o : data1[a].update_at_o,
          jlpl_comments_i : data1[a].jlpl_comments_i,
          status_i : data1[a].status_i,
          update_at_i : data1[a].update_at_i,
          jlpl_comments_p : data1[a].jlpl_comments_p,
          status_p : data1[a].status_p,
          update_at_p : data1[a].update_at_p,
          jlpl_comments_c : data1[a].jlpl_comments_c,
          status_c : data1[a].status_c,
          update_at_c : data1[a].update_at_c,
          jlpl_comments_cls : data1[a].jlpl_comments_cls,
          status_cls : data1[a].status_cls,
          update_at_cls : data1[a].update_at_cls,
          station_name : data2[c].station_name,
          job_no : data2[c].job_detail,
        }
        final_data.push(js);
      }
    }
    if(a == data1.length - 1){
      this.history_record = final_data;
      this.loader_show = false;
      this.final_data = this.dataSource.filteredData;
      this.time_calculation();
    }
   }
  }
   

  time_calculation(){
    let temp_data = [];
    this.history_record.forEach(element => {
    if(element.fault_type == 'Lift not working'){
      if(element.update_at_o && element.update_at_c){
        var inputJSON = {
          "created_date": this.dateformat(element.update_at_o.toUpperCase()),
          "current_time": this.dateformat(element.update_at_c.toUpperCase())
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
      let val = diff.day * 24;
      val = diff.day * 24;
      val = val + diff.hour;
      val = val + diff.minute / 60;
      this.lift_breakdown_time = ""+val;
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
    if(element.fault_type == 'Lift not working' || element.fault_type == 'Escalator not working'){
      temp = this.ram.toLocaleString('en-IN')
      temp2 = duration
    }
    element.lift_breakdown_time = this.lift_breakdown_time;
    let row = {
      type: "LIFT" ,
      break_down_time:element.update_at_o,
      restored_time:element.update_at_c,
      duration:temp2,
      status:element.current_status,
      ram : temp,
      fault_type:element.fault_type,
      ticket_no:element.ticket_no,
      station_name:element.station_name,
      job_detail:element.job_no,
      lift_breakdown_time : ""+(+this.lift_breakdown_time).toFixed(2)
    }
    temp_data.push(row);
  }
});
this.final_data = temp_data;
this.dataSource = new MatTableDataSource(temp_data);
setTimeout(() => this.dataSource.paginator = this.paginator);
// this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;
this.get_hrs_count();

}




  exportAsXLSX2() {
    let new_list = [];
    for(let a = 0; a < this.history_record.length ; a ++){

     let completed_date = '';
     if(this.history_record[a].current_status == 'Completed'){
      completed_date = this.history_record[a].completed_date
     }
    let c = {
        "Ticket No" : this.history_record[a].ticket_no,
        "Station Name" : this.history_record[a].station_name,
        "Job No" : this.history_record[a].job_no,
        "Fault Type" : this.history_record[a].fault_type,
        "CMRL Comments" : this.history_record[a].cmrl_comments,
        "JLPL Comments Open" : this.history_record[a].jlpl_comments_o,
        "Status Open" : this.history_record[a].status_o,
        "Update At Open" : this.history_record[a].update_at_o,
        "JLPL Comments Inprogress" : this.history_record[a].jlpl_comments_i,
        "Status Inprogress" : this.history_record[a].status_i,
        "Update At Inprogress" : this.history_record[a].update_at_i,
        "JLPL Comments Pending" : this.history_record[a].jlpl_comments_p,
        "Status Pending" : this.history_record[a].status_p,
        "Update At Pending" : this.history_record[a].update_at_p,
        "JLPL Comments Completed" : this.history_record[a].jlpl_comments_c,
        "Status Completed" : this.history_record[a].status_c,
        "Update At Completed" : this.history_record[a].update_at_c,
        "JLPL Comments Closed" : this.history_record[a].jlpl_comments_cls,
        "Status Closed" : this.history_record[a].status_cls,
        "Update At Closed" : this.history_record[a].update_at_cls,
        "Duration" : this.history_record[a].duration,
        "Ram" :  this.history_record[a].ram,
        "Current Status" : this.history_record[a].current_status,
        "Completed Date" : completed_date,
        "Created At" : this.history_record[a].created_at,
        "Last Updated" : this.history_record[a].last_updated,
    }
    new_list.push(c);
    if(a == this.history_record.length - 1){
      this.exportToExcelService.exportAsExcelFile(new_list, "Ticket History Details",);
    }
    }
  }

  setEndDateMinValue(data) {
    this.minEndDate = this.formGroup.controls.startDate.value;
  }

  get_count_lift(){
    this.adminService.getjobno_lift().pipe()
    .subscribe( data => {
        this.lift_count = data['Data'].length;
      },error => {
        this.error = error;
      });
  }

  get_hrs_count(){
   var lift_data = []; 
   var  hours = 0;
    this.final_data.forEach(element => {
      if(element.lift_breakdown_time !== 'NaN' && element.fault_type == 'Lift not working'){
        hours =  hours + +element.lift_breakdown_time;
        lift_data.push(element);
      }
    });

 var dt = new Date(this.selectedDate);
 var month = dt.getMonth();
 var year = dt.getFullYear();
 let daysInMonth = 0;


 daysInMonth = new Date(dt.getFullYear(), dt.getMonth()+1, 0).getDate();



 this.no_of_days = daysInMonth;
 this.lift_operation_time = 20;
 this.lift_quantity = this.jobNumberList.length;
 this.total_down_time = +hours.toFixed(2);
 this.no_of_breakdown = this.final_data.length;
this.no_of_months = 12;
 


this.total_operation_time = this.lift_quantity * this.lift_operation_time * this.no_of_days;
this.total_up_time = this.total_operation_time - this.total_down_time;
this.mtbma = this.total_up_time / (this.no_of_breakdown + this.lift_quantity);
this.mtbf = this.total_operation_time / this.no_of_breakdown;
this.mttr = this.total_down_time / this.no_of_breakdown;
this.availability = (this.total_up_time / this.total_operation_time) * 100;
this.call_out_ratio = (this.no_of_breakdown * this.no_of_months)/this.lift_quantity;



this.total_operation_time = +this.total_operation_time.toFixed(2);
this.total_up_time = +this.total_up_time.toFixed(2);
this.mtbma = +this.mtbma.toFixed(2);
this.mtbf = +this.mtbf.toFixed(2);
this.mttr = +this.mttr.toFixed(2);
this.availability = +this.availability.toFixed(2);
this.call_out_ratio = +this.call_out_ratio.toFixed(2);






//  let breakdown_time = hours;

//  let no_of_days = daysInMonth;
//  let lift_qnty = lift_data.length;
//  let lift_oper_time = total_hours - breakdown_time;



//  var tot =  no_of_days * lift_oper_time *  this.jobNumberList.length;
//  var tup = tot - breakdown_time;
//  var mtbma = tup/(lift_qnty + this.jobNumberList.length);
//  var mtbf = tot / lift_qnty;
//  var mttr = breakdown_time / lift_qnty;
//  var avail = (tup/tot) * 100;
//  var call_out = (lift_qnty * 1)/ this.jobNumberList.length



}

startTimer() {
  this.interval = setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft--;
    } else {
      this.submitData();
      this.pauseTimer();
    }
  },1000)
}

pauseTimer() {
  clearInterval(this.interval);
}


printComponent(cmpName) {
  let printContents = document.getElementById(cmpName).innerHTML;
  let originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
}


}


