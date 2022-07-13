import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { MatTableAttributes, DateFormat } from "../../common/ui.constant";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { first } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { User } from "src/app/core/models/auth.models";
import { AdminModulesService } from "src/app/core/services/admin/admin-modules.service";
import { AddJobNoDetailsComponent } from "./add-job-no-details/add-job-no-details.component";
import { EditJobNoDetailsComponent } from "./edit-job-no-details/edit-job-no-details.component";
import { ExportToExcelService } from "src/app/core/services/exportExcel/export-to-excel.service";
import { FormControl, FormGroup } from "@angular/forms";

export class Product {
  job_no: string;
  type : string;
  serving_level: string;
  delete_status:string;
  createdDate: string;
  updatedDate: string;
  unique_id:string;
  station_name:string;
  station_id:string;
  _id:string
}
@Component({
  selector: 'app-job-no-details',
  templateUrl: './job-no-details.component.html',
  styleUrls: ['./job-no-details.component.css']
})
export class JobNoDetailsComponent implements OnInit {
  @ViewChild('test1', { static: false }) content: ElementRef;
  testAttributesMap = new Map();

  PAGE_SIZE = MatTableAttributes.PAGE_SIZE;
  PAGINATION_RANGE = MatTableAttributes.PAGINATION_RANGE;
  DATE_FORMAT = DateFormat.DATE_FORMAT;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  error = '';
  jobNumberList:any;
  dynamicTableData: any[];
  user: User;
  stationAllList: any;

  constructor(private adminService:AdminModulesService,public dialog: MatDialog,private exportToExcelService: ExportToExcelService,)
   {}

  public displayedColumns: string[] = ['station_name', 'type' , 'job_no','serving_level','unique_id','createdDate',  'updatedDate','actions'];
  public displayedLabelColumns: string[] = ['station name','Type','job no','Serving Level / Location','unique id','created Date',  'updated Date', 'Edit'];
  dataSource: MatTableDataSource<Product>;

  ngOnInit() {
   this.getAllCustomer();
   this.getAllDatas();
  }

  getAllCustomer(){
    this.adminService.getjobnoList().pipe()
    .subscribe( data => {
        console.log("data ",data);
        this.jobNumberList = data['Data'];
        this.loadRecord();
      },error => {
        this.error = error;
      });
  }

  getAllDatas(){
    this.adminService.getstationList().pipe()
    .subscribe( data => {
        console.log("data ",data);
        this.stationAllList = data['Data'];
      },error => {
        this.error = error;
      });
  }


  loadRecord() {

    this.dynamicTableData = [];
    this.jobNumberList.forEach(element => {
      let row: Product = {
        job_no: element.job_no,
        type : element.station_id.type,
        serving_level: element.serving_level,
        delete_status:element.delete_status && element.delete_status == true ?  "true" : "false" ,
        createdDate: element.created_date,
        updatedDate: element.updatedAt,
        unique_id:element.unique_id,
        station_name:element.station_id.station_name,
        station_id:element.station_id._id,
        _id:element._id
      }
      this.dynamicTableData.push(row);
    })
    this.dataSource = new MatTableDataSource(this.dynamicTableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }


  public addRecord() {
    const dialogRef = this.dialog.open(AddJobNoDetailsComponent, {
      width: '550px',
      height: 'fit-content',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {
        this.getAllCustomer();
      }
    });
  }

  exportAsXLSX(): void {

    let new_list = this.dataSource.filteredData.map(function(obj) {
      return {
        "Station Name": obj.station_name,
        "Job No":obj.job_no,
        "Serving Level / Location":obj.serving_level,
        "Unique Id":obj.unique_id,
        "Created Date":new Date(obj.createdDate),
        "Updated Date":new Date(obj.updatedDate),
      }
    });
    this.exportToExcelService.exportAsExcelFile(new_list, "Job No Details",);
  }

  public editRecord(items) {

    const dialogRef = this.dialog.open(EditJobNoDetailsComponent, {
      width: '550px',
      height: 'fit-content',
      disableClose: true,
      data: {
        _id:items._id,
        station_id:items.station_id,
        job_no:items.job_no,
        serving_level:items.serving_level,
        unique_id:items.unique_id,

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {
        this.getAllCustomer();
      }
    });
  }

  public deleteRecord(recordId){
    //
    // this.customerService.deleteCustomer(recordId).pipe()
    // .subscribe( data => {
    //     console.log("data ",data);
    //     this.jobNumberList = data;
    //     this.getAllCustomer();
    //   },error => {
    //     this.error = error;
    //   });
  }

      // form group
      filterForm = new FormGroup({
        station_name: new FormControl(),
        serving_level: new FormControl(),
        job_no: new FormControl(),

      });

      get station_name() { return this.filterForm.get('station_name'); }
      get serving_level() { return this.filterForm.get('serving_level'); }
      get job_no() { return this.filterForm.get('job_no'); }


      isArray = function(a) {
          return (!!a) && (a.constructor === Array);
      };
      isObject = function(a) {
          return (!!a) && (a.constructor === Object);
      };
    getFormsValue() {

      const filterValues = {
        station_name: this.station_name.value,
        serving_level: this.serving_level.value,
        job_no: this.job_no.value,
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


}


