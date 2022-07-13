import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { MatTableAttributes, DateFormat } from "../../common/ui.constant";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import Swal from 'sweetalert2'
import { AuthenticationService } from "src/app/core/services/auth.service";
import { User } from "src/app/core/models/auth.models";
import { AdminModulesService } from "src/app/core/services/admin/admin-modules.service";
import { AddStationDetailsComponent } from "./add-station-details/add-station-details.component";
import { EditStationDetailsFormComponent } from "./edit-station-details-form/edit-station-details-form.component";
import { ExportToExcelService } from "src/app/core/services/exportExcel/export-to-excel.service";
import { AlertService } from "src/app/core/services/alert/alert.service";
import { FormControl, FormGroup } from "@angular/forms";

export class Product {
  _id:string;
  station_name: string;
  type: string;
  delete_status:string;
  createdDate: string;
  updatedDate: string;
}
@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.css']
})
export class StationDetailsComponent implements OnInit {
  globalFilter = '';
  @ViewChild('test1', { static: false }) content: ElementRef;
  testAttributesMap = new Map();

  PAGE_SIZE = MatTableAttributes.PAGE_SIZE;
  PAGINATION_RANGE = MatTableAttributes.PAGINATION_RANGE;
  DATE_FORMAT = DateFormat.DATE_FORMAT;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  error = '';
  stationList:any =[];
  public filteredList = this.stationList.slice();
  public isFiltered(permission) {
    return this.filteredList.find(item => item.id === permission.id);
  }
  dynamicTableData: any[];
  user: User;

  constructor(private adminService:AdminModulesService,private alertService :AlertService,
    private exportToExcelService: ExportToExcelService,
    public dialog: MatDialog
    )
   {}

  public displayedColumns: string[] = ['station_name','createdDate',  'updatedDate','actions'];
  public displayedLabelColumns: string[] = ['station name','created Date',  'updated Date', 'action'];
  dataSource: MatTableDataSource<Product>;

  ngOnInit() {
   this.getAllDatas();
  }

  getAllDatas(){
    this.adminService.getstationList().pipe()
    .subscribe( data => {
        console.log("data ",data);
        this.stationList = data['Data'];

        this.loadRecord();
      },error => {
        this.error = error;
      });
  }


  loadRecord() {

    this.dynamicTableData = [];
    this.stationList.forEach(element => {
      let row: Product = {
        _id:element._id,
        station_name: element.station_name,
        type: element.type && element.type == 1 ?  "LIFT" : "ESCALATORS",
        delete_status:element.delete_status && element.delete_status == true ?  "true" : "false" ,
        createdDate: element.createdAt,
        updatedDate: element.updatedAt,
      }
      this.dynamicTableData.push(row);
    })
    this.dataSource = new MatTableDataSource(this.dynamicTableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }




  exportAsXLSX(): void {
    let new_list = this.dataSource.filteredData.map(function(obj) {
      return {
        "Station Name": obj.station_name,
        "Created Date":new Date(obj.createdDate),
        "Updated Date":new Date(obj.updatedDate),
      }
    });
    this.exportToExcelService.exportAsExcelFile(new_list, "Station Details",);
  }


  public addRecord() {
    const dialogRef = this.dialog.open(AddStationDetailsComponent, {
      width: '550px',
      height: 'fit-content',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {
        this.getAllDatas();
      }
    });
  }

  public editRecord(items) {
    const dialogRef = this.dialog.open(EditStationDetailsFormComponent, {
      width: '550px',
      height: 'fit-content',
      disableClose: true,
      data: {
        _id:items._id,
        station_name:items.station_name,
        type:items.type,

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {
        this.getAllDatas();
      }
    });
  }

  public deleteRecord(recordId){
    this.adminService.deletestation(recordId._id).subscribe(data=>{
      const response:any = data;
      if (response['Status'] == "Success") {
        this.alertService.success_message('Saved successfully');
        this.getAllDatas();
      } else {
        this.alertService.error_message('Something Went wrong');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


