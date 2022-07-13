import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModules } from 'src/app/material.module';
import { AddEditTicketDetailsFormComponent } from './add-edit-ticket-details-form/add-edit-ticket-details-form.component';
import { TicketDetailsComponent } from './ticket-details.component';
import { AddTicketDetailsComponent } from './add-ticket-details/add-ticket-details.component';
import { EditTicketDetailsComponent } from './edit-ticket-details/edit-ticket-details.component';


@NgModule({
    declarations: [
        TicketDetailsComponent,
        AddEditTicketDetailsFormComponent,
        AddTicketDetailsComponent,
        EditTicketDetailsComponent

    ],
    exports: [TicketDetailsComponent],
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
        AddEditTicketDetailsFormComponent,
        AddTicketDetailsComponent,
        EditTicketDetailsComponent

    ]

})




export class TicketDetailsModule { }