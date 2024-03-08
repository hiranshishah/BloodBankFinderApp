import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { SearchfilterComponent } from './components/searchfilter/searchfilter.component';
import { MaplocationComponent } from './components/maplocation/maplocation.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children:[{
      path:'',
      component: SearchfilterComponent
    },{
      path:'mordetails',
      component:MaplocationComponent
    }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
