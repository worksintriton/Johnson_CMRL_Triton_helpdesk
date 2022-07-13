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
import { ActivatedRoute } from "@angular/router";
import { ViewTicketImageComponent } from "./view-ticket-image/view-ticket-image.component";
import { SingleTicketEditComponent } from "./single-ticket-edit/single-ticket-edit.component";

export class Product {
  date_of_create: string;
  delete_status: string;
  ticket_comments:string;
  ticket_no:string;
  ticket_status:string;
  createdDate: string;
  updatedDate: string;
  ticket_photo:any;
  _id : string;
}

@Component({
  selector: 'app-view-ticket-details',
  templateUrl: './view-ticket-details.component.html',
  styleUrls: ['./view-ticket-details.component.css']
})
export class ViewTicketDetailsComponent implements OnInit {
  @ViewChild('test1', { static: false }) content: ElementRef;
  testAttributesMap = new Map();

  PAGE_SIZE = MatTableAttributes.PAGE_SIZE;
  PAGINATION_RANGE = MatTableAttributes.PAGINATION_RANGE;
  DATE_FORMAT = DateFormat.DATE_FORMAT;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  error = '';
  List:any;
  dynamicTableData: any[];
  user: User;
  ticket_no: any;
  Days: any = '';
  penalty: any;

  constructor(public dialog: MatDialog,private adminService:AdminModulesService, private route: ActivatedRoute,)
   {
    this.route.queryParams.subscribe(params => {
      this.ticket_no = params['ticket_no'];
      console.log("menuId ",this.ticket_no);
    });

   }

  public displayedColumns: string[] = ['ticket_no','date_of_create','ticket_comments','ticket_status','viewImg'];
  public displayedLabelColumns: string[] = ['ticket no','date','ticket comments','ticket status','viewImg'];
  dataSource: MatTableDataSource<Product>;

  ngOnInit() {
   this.getAllRecords();
  }

  getAllRecords(){

    this.adminService.getSelectedTicketList(this.ticket_no).pipe()
    .subscribe( data => {
        console.log("getSelectedTicketList ",data);
        this.List = data['Data'];
        this.loadRecord();
      },error => {
        this.error = error;
      });
  }





  loadRecord() {

    this.dynamicTableData = [];
    this.List.forEach(element => {


      let row: Product = {
        date_of_create: element.date_of_create,
        delete_status:element.delete_status,
        ticket_comments:element.ticket_comments,
        ticket_no:element.ticket_no,
        ticket_status:element.ticket_status,
        createdDate: element.createdAt,
        updatedDate: element.updatedAt,
        ticket_photo:element.ticket_photo,
        _id : element._id
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


  public viewImg(items) {

    const dialogRef = this.dialog.open(ViewTicketImageComponent, {
      width: '700px',
      height: 'fit-content',
      disableClose: true,
      data: {
        ticket_photo:items.ticket_photo,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {

      }
    });
  }



  public editTicket(items) {
   console.log(items);
    const dialogRef = this.dialog.open(SingleTicketEditComponent, {
      width: '700px',
      height: 'fit-content',
      disableClose: true,
      data: {
        _id:items._id,
        createdAt:items.createdAt,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {

      }
    });
  }

}


