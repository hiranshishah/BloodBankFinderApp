import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloodbankComponent } from './bloodbank.component';
import { AddbloodbankComponent } from './components/addbloodbank/addbloodbank.component';
import { UpdatebloodbankComponent } from './components/updatebloodbank/updatebloodbank.component';
import { DeletebloodbankComponent } from './components/deletebloodbank/deletebloodbank.component';

const routes: Routes = [
  {
    path: '',
    component: BloodbankComponent,
    children: [
      {
        path: 'add',
        component: AddbloodbankComponent
      },
      {
        path: 'update',
        component: UpdatebloodbankComponent
      },
      {
        path: 'delete',
        component: DeletebloodbankComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloodbankRoutingModule { }
