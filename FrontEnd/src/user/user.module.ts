import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SearchfilterComponent } from './components/searchfilter/searchfilter.component';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MaplocationComponent } from './components/maplocation/maplocation.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    UserComponent,
    SearchfilterComponent,
    MaplocationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class UserModule { }
