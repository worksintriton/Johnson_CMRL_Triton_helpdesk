import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModules } from 'src/app/material.module';
import { FaultTypeDetailsComponent } from './fault-type-details.component';
import { AddEditFaultTypeDetailsFormComponent } from './add-edit-fault-type-details-form/add-edit-fault-type-details-form.component';
import { AddFaultTypeDetailsComponent } from './add-fault-type-details/add-fault-type-details.component';
import { EditFaultTypeDetailsComponent } from './edit-fault-type-details/edit-fault-type-details.component';




@NgModule({
    declarations: [
        FaultTypeDetailsComponent,
        AddEditFaultTypeDetailsFormComponent,
        AddFaultTypeDetailsComponent,
        EditFaultTypeDetailsComponent
    ],
    exports: [FaultTypeDetailsComponent],
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
        AddEditFaultTypeDetailsFormComponent,
        AddFaultTypeDetailsComponent,
        EditFaultTypeDetailsComponent
    ]

})




export class FaultTypeDetailsModule { }