import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModules } from 'src/app/material.module';
import { AddEditStationDetailsFormComponent } from './add-edit-station-details-form/add-edit-station-details-form.component';
import { AddStationDetailsComponent } from './add-station-details/add-station-details.component';
import { EditStationDetailsFormComponent } from './edit-station-details-form/edit-station-details-form.component';
import { StationDetailsComponent } from './station-details.component';


@NgModule({
    declarations: [
        StationDetailsComponent,
        AddEditStationDetailsFormComponent,
        AddStationDetailsComponent,
        EditStationDetailsFormComponent

    ],
    exports: [StationDetailsComponent],
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
        AddEditStationDetailsFormComponent,
        AddStationDetailsComponent,
        EditStationDetailsFormComponent
    ]

})




export class StationDetailsModule { }