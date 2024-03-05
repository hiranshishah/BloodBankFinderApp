import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog } from '@angular/material/dialog';
import { AppserviceService } from 'src/shared/services/appservice.service';
import { ViewuserComponent } from '../viewuser/viewuser.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isButtonDisabled: boolean = false; // Set this to true after successful login or signup
  userId: string | undefined;
  dropdownOpen: boolean = true;
  constructor(private dialog: MatDialog, private userservice: AppserviceService, private router: Router) {

  }
  openSignInDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSignUpDialog();
      }
    });
    this.setUserId();
  }

  //function to open SignUp Dialog box.
  openSignUpDialog(): void {
    this.dialog.open(SignupComponent);
    this.setUserId();
  }
  setUserId(): void {
    this.userId = this.userservice.getValue();
    this.userservice.valueChange.subscribe(newValue => {
      this.userId = newValue;
    });
    this.isButtonDisabled = true;
  }
  logout(): void {
    this.userservice.clearValue();
    this.router.navigate(['/']);
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  viewUserDetails(userid: string) {
    this.dialog.open(ViewuserComponent, {
      data: userid
    });
  }




}


