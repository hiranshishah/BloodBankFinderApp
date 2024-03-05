import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from 'src/user/user.module';
import { BloodbankModule } from 'src/bloodbank/bloodbank.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewuserComponent } from './components/viewuser/viewuser.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('src/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'bloodbank',
    loadChildren: () => import('src/bloodbank/bloodbank.module').then(m => m.BloodbankModule)
  },
  // {
  //   path: '',
  //   component: AppComponent,
  //   children:[{
  //     path:'home',
  //     component: HomeComponent
  //   }
  //   ]
  // },

  
  { path: 'home', component: HomeComponent },
  {
    path:'payment', component:PaymentComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'viewUser',
    component:ViewuserComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
