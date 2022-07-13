import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModules } from 'src/app/material.module';
import { JobNoDetailsComponent } from './job-no-details.component';
import { AddEditJobNoDetailsFormComponent } from './add-edit-job-no-details-form/add-edit-job-no-details-form.component';
import { AddJobNoDetailsComponent } from './add-job-no-details/add-job-no-details.component';
import { EditJobNoDetailsComponent } from './edit-job-no-details/edit-job-no-details.component';



@NgModule({
    declarations: [
        JobNoDetailsComponent,
        AddEditJobNoDetailsFormComponent,
        AddJobNoDetailsComponent,
        EditJobNoDetailsComponent
    ],
    exports: [JobNoDetailsComponent],
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
        AddEditJobNoDetailsFormComponent,
        AddJobNoDetailsComponent,
        EditJobNoDetailsComponent
    ]

})




export class JobNoDetailsModule { }