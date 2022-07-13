import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModules } from 'src/app/material.module';
import { ViewTicketDetailsComponent } from './view-ticket-details.component';
import { ViewTicketImageComponent } from './view-ticket-image/view-ticket-image.component';
import { SingleTicketEditComponent } from './single-ticket-edit/single-ticket-edit.component';



@NgModule({
    declarations: [
        ViewTicketDetailsComponent,
        ViewTicketImageComponent,
        SingleTicketEditComponent
    ],
    exports: [ViewTicketDetailsComponent],
    imports: [
        CommonModule,
        AppMaterialModules,
        FormsModule,
        ReactiveFormsModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [  
        ViewTicketImageComponent,
        SingleTicketEditComponent
    ]

})




export class ViewTicketDetailsModule { }