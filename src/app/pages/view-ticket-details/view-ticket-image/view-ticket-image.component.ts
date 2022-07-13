import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view-ticket-image',
  templateUrl: './view-ticket-image.component.html',
  styleUrls: ['./view-ticket-image.component.css']
})
export class ViewTicketImageComponent implements OnInit {
  URI = 'http://192.168.1.68:3000/api';
  ticket_photo:any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ViewTicketImageComponent>) {}


  ngOnInit() {
   console.log("data",this.data);
   this.ticket_photo = this.data.ticket_photo;
  }

}
