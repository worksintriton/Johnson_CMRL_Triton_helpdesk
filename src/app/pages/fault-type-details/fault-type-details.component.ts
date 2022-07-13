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
import { AddFaultTypeDetailsComponent } from "./add-fault-type-details/add-fault-type-details.component";
import { EditFaultTypeDetailsComponent } from "./edit-fault-type-details/edit-fault-type-details.component";
import { ExportToExcelService } from "src/app/core/services/exportExcel/export-to-excel.service";

export class Product {
  type: string;
  fault_type: string;
  createdDate: string;
  updatedDate: string;
  unique_id:string;
  _id:string
}
@Component({
  selector: 'app-fault-type-details',
  templateUrl: './fault-type-details.component.html',
  styleUrls: ['./fault-type-details.component.css']
})
export class FaultTypeDetailsComponent implements OnInit {
  @ViewChild('test1', { static: false }) content: ElementRef;
  testAttributesMap = new Map();

  PAGE_SIZE = MatTableAttributes.PAGE_SIZE;
  PAGINATION_RANGE = MatTableAttributes.PAGINATION_RANGE;
  DATE_FORMAT = DateFormat.DATE_FORMAT;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  error = '';
  salesPersonList:any;
  dynamicTableData: any[];
  user: User;

  constructor(private adminService:AdminModulesService,private exportToExcelService: ExportToExcelService, public dialog: MatDialog)
   { }

  public displayedColumns: string[] = ['type','fault_type','createdDate',  'updatedDate','actions'];
  public displayedLabelColumns: string[] = ['type','fault type','created Date',  'updated Date', 'Edit'];
  dataSource: MatTableDataSource<Product>;

  ngOnInit() {
   this.getAllCustomer();
  }

  getAllCustomer(){
    this.adminService.getfaultList().pipe()
    .subscribe( data => {
        console.log("data ",data);
        this.salesPersonList = data['Data'];
        this.loadRecord();
      },error => {
        this.error = error;
      });
  }


  loadRecord() {

    this.dynamicTableData = [];
    this.salesPersonList.forEach(element => {
      let row: Product = {
        type: element.type && element.type == 1 ?  "LIFT" : "ESCALATORS",
        fault_type: element.fault_type,
        createdDate: element.createdAt,
        updatedDate: element.updatedAt,
        unique_id:element.unique_id,
        _id:element._id
      }
      this.dynamicTableData.push(row);
    })
    this.dataSource = new MatTableDataSource(this.dynamicTableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  public addRecord() {
    const dialogRef = this.dialog.open(AddFaultTypeDetailsComponent, {
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

  public editRecord(items) {
    const dialogRef = this.dialog.open(EditFaultTypeDetailsComponent, {
      width: '550px',
      height: 'fit-content',
      disableClose: true,
      data: {
        type:items.type,
        fault_type:items.fault_type,
        _id:items._id,
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
    //     this.salesPersonList = data;
    //     this.getAllCustomer();
    //   },error => {
    //     this.error = error;
    //   });
  }


  exportAsXLSX(): void {
    let new_list = this.dataSource.filteredData.map(function(obj) {
      return {
        "type": obj.type,
        "Fault Type":obj.fault_type,
        "Created Date":new Date(obj.createdDate),
        "Updated Date":new Date(obj.updatedDate),
      }
    });
    this.exportToExcelService.exportAsExcelFile(new_list, "Fault Type Details",);
  }


}


