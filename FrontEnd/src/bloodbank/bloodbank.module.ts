import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloodbankRoutingModule } from './bloodbank-routing.module';
import { BloodbankComponent } from './bloodbank.component';
import { AddbloodbankComponent } from './components/addbloodbank/addbloodbank.component';
import { UpdatebloodbankComponent } from './components/updatebloodbank/updatebloodbank.component';
import { DeletebloodbankComponent } from './components/deletebloodbank/deletebloodbank.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    BloodbankComponent,
    AddbloodbankComponent,
    UpdatebloodbankComponent,
    DeletebloodbankComponent,
    
  ],
  imports: [
    CommonModule,
    BloodbankRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
   
  ]
})
export class BloodbankModule { }
