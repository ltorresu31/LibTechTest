import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsercardsComponent } from './usercards/usercards.component';
import { UsermaintenanceComponent } from './usermaintenance/usermaintenance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from "@ng-select/ng-select";
import { ListusersComponent } from './listusers/listusers.component';
import {RouterModule} from "@angular/router";
import {DataTablesModule} from "angular-datatables";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {AppModule} from "../../app.module";
import { UpdateuserComponent } from './updateuser/updateuser.component';
@NgModule({
  declarations: [
    UsercardsComponent,
    UsermaintenanceComponent,
    ListusersComponent,
    UpdateuserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule,
    DataTablesModule,
    NgbDropdownModule,
  ]
})
export class UserModule { }
