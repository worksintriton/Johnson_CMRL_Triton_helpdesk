import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModules } from 'src/app/material.module';
import { UserDetailsComponent } from './user-details.component';
import { AddEditUserDetailsFormComponent } from './add-edit-user-details-form/add-edit-user-details-form.component';
import { AddUserDetailsComponent } from './add-user-details/add-user-details.component';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';



@NgModule({
    declarations: [
        UserDetailsComponent,
        AddEditUserDetailsFormComponent,
        AddUserDetailsComponent,
        EditUserDetailsComponent

    ],
    exports: [UserDetailsComponent],
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
        AddEditUserDetailsFormComponent,
        AddUserDetailsComponent,
        EditUserDetailsComponent
    ]

})

export class UserDetailsModule { }