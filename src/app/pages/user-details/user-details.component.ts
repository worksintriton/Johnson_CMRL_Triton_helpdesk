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
import { EditUserDetailsComponent } from "./edit-user-details/edit-user-details.component";
import { AddUserDetailsComponent } from "./add-user-details/add-user-details.component";
import { ExportToExcelService } from "src/app/core/services/exportExcel/export-to-excel.service";

export class Product {
  username: string;
  user_email: string;
  delete_status:string;
  user_phone:string;
  createdDate: string;
  updatedDate: string;
  password:string;
  date_of_reg:string;
  user_status:string;
  user_type:string;
  _id:string
}
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {


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

  constructor(private adminService:AdminModulesService,private exportToExcelService: ExportToExcelService,public dialog: MatDialog)
   { }

  public displayedColumns: string[] = ['username','user_email','user_phone','user_type','createdDate',  'updatedDate','actions'];
  public displayedLabelColumns: string[] = ['user name','user email','user phone','user type','created Date',  'updated Date', 'Edit'];
  dataSource: MatTableDataSource<Product>;

  ngOnInit() {
   this.getAllCustomer();
  }

  getAllCustomer(){
    this.adminService.getUserList().pipe()
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
        username: element.username,
        user_email: element.user_email,
        user_phone:element.user_phone,
        delete_status:element.delete_status && element.delete_status == true ?  "true" : "false" ,
        createdDate: element.createdAt,
        updatedDate: element.updatedAt,
        password:element.password,
        date_of_reg:element.date_of_reg,
        user_status:element.user_status,
        user_type:element.user_type && element.user_type == 1 ? "CMRL" :"JOHNSON",
        _id:element._id,
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
    const dialogRef = this.dialog.open(AddUserDetailsComponent, {
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
        "User Name": obj.username,
        "User Email":obj.user_email,
        "User Phone":obj.user_phone,
        "User Type":obj.user_type,
        "Created Date":new Date(obj.createdDate),
        "Updated Date":new Date(obj.updatedDate),
      }
    });
    this.exportToExcelService.exportAsExcelFile(new_list, "User Details",);
  }


  public editRecord(items) {
    const dialogRef = this.dialog.open(EditUserDetailsComponent, {
      width: '550px',
      height: 'fit-content',
      disableClose: true,
      data: {
        _id:items._id,
        username:items.username,
        password:items.password,
        user_email:items.user_email,
        user_phone:items.user_phone,
        employee_id:items.employee_id,
        date_of_reg:items.date_of_reg,
        user_type:items.user_type,
        user_status:items.user_status
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {
        this.getAllCustomer();
      }
    });
  }

  public deleteRecord(recordId){

  }



}


