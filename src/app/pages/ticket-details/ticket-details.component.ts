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
import { EditTicketDetailsComponent } from "./edit-ticket-details/edit-ticket-details.component";

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
  _id : string;
}
@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
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
  faults_list = [];

  constructor(private adminService:AdminModulesService,public dialog: MatDialog, private exportToExcelService: ExportToExcelService,
    private route: ActivatedRoute,private router :Router, private fb: FormBuilder,)
   {
    // this.route.queryParams.subscribe(params => {
    //   this.station_id = params['station_id'];
    //   console.log("menuId ",this.station_id);
    // });

   }

  public displayedColumns: string[] = ['ticket_no','break_down_observed','type','break_down_time','restored_time','duration','ram','status','station_name','fault_type','createdDate', "actions"];
  public displayedLabelColumns: string[] = ['ticket no','CMRL comments','type','break down time','restored time','duration','RAM','status','station name','fault type','created Date',  'Action'];
  dataSource: MatTableDataSource<Product>;

  ngOnInit() {
   this.getstationList();
   this.getAllRecords();
   var currentDate = new Date();
   var beforeMonthDate = currentDate.setMonth(currentDate.getMonth() - 1);
   this.formGroup = this.fb.group({
    startDate: [new Date(beforeMonthDate), Validators.required],
    endDate: [new Date(), Validators.required],
  });
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
      if(element.fault_type == 'Lift not working' || element.fault_type == 'Escalator not working'){
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
        createdDate: element.create_date_time,
        updatedDate: element.updatedAt,
        ticket_no:element.ticket_no,
        station_name:element.station_detail.station_name,
        job_detail:element.job_detail.job_no,
        _id : element._id,
      }
      this.dynamicTableData.push(row);
    })
    // this.historyPrint(this.dynamicTableData);
    this.dataSource = new MatTableDataSource(this.dynamicTableData);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.final_data = this.dataSource.filteredData;
    console.log(this.final_data);
    console.log("test 2");
    this.getFormsValue();
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

  public editRecord(items) {
   console.log(items);
    const dialogRef = this.dialog.open(EditTicketDetailsComponent, {
      width: '550px',
      height: 'fit-content',
      disableClose: true,
      data: {
        _id:items._id,
        fault_type:items.fault_type
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {
        // this.ngOnInit();
      }
    });
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



    console.log(filterValues);

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
    console.log(this.dataSource.filteredData);
    this.final_data = this.dataSource.filteredData;
    console.log("test 3");
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
   this.loader_show = true;
   let values = this.formGroup.value;
   console.log(values);
   if(values.startDate == ''){
    alert("Please Select Start Date")
   }
    else if(values.endDate == ''){
      alert("Please Select End Date")
   }else {
    this.adminService.getFilterDatas(this.formGroup.value).pipe()
    .subscribe( data => {
        this.List = data['Data'];
        console.log("this.List",this.List);
        console.log("test 1");
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
      console.log("test 5");
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
      console.log(this.history_record);
      console.log("test 6");
      this.final_data = this.dataSource.filteredData;

    }
   }
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

  setEndDateMinValue() {

    this.minEndDate = this.formGroup.controls.startDate.value;
  }

}


