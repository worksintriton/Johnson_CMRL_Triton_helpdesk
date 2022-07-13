import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { MatTableAttributes, DateFormat } from "../../common/ui.constant";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from "src/app/core/models/auth.models";
import { AdminModulesService } from "src/app/core/services/admin/admin-modules.service";

export class Product {
  username: string;
  user_email: string;
  user_phone:string;
  createdDate: string;
  updatedDate: string;
  _id:string
}
@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {


  @ViewChild('test1', { static: false }) content: ElementRef;
  testAttributesMap = new Map();
  selection = new SelectionModel<Product>(true, []);
  PAGE_SIZE = MatTableAttributes.PAGE_SIZE;
  PAGINATION_RANGE = MatTableAttributes.PAGINATION_RANGE;
  DATE_FORMAT = DateFormat.DATE_FORMAT;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  error = '';
  salesPersonList:any;
  dynamicTableData: any[];
  user: User;
  userList: any[];

  constructor(private adminService:AdminModulesService)
   { }

  public displayedColumns: string[] = ['select','username','user_email','user_phone','createdDate',];
  public displayedLabelColumns: string[] = ['select','user name','user email','user phone','created Date',];
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
        createdDate: element.createdAt,
        updatedDate: element.updatedAt,
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

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }



  sendNotification() {

    var selectedList = this.selection.selected;
    this.userList = [];
    selectedList.forEach(element => {
      this.userList.push(element["_id"]);
    });
  }

}


