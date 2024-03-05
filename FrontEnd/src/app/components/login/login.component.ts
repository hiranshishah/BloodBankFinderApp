import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { loginuser } from 'src/shared/models/login';
import { AppserviceService } from 'src/shared/services/appservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() userLoggedIn = new EventEmitter<string>();
  loginForm: FormGroup;
 
  constructor(public dialogRef: MatDialogRef<LoginComponent>, public dialog: MatDialog, public userService: AppserviceService, public router: Router) { }
 
  ngOnInit(): void {
     this.loginForm = new FormGroup({
       username: new FormControl('', Validators.required),
       password: new FormControl('', Validators.required)
     });
     this.onSignIn();
  }
 
  onSignIn(): void {
     if (this.loginForm.valid) {
       const loginData: loginuser = this.loginForm.value;
       this.userService.loginuser(loginData).subscribe({
         next: (response) => {
           console.log("Logged in successfully!");
           this.dialogRef.close();
           this.router.navigate(['/']);
           alert("User Logged In Successfully");
           this.userService.setValue(loginData.username)
         },
         error: (err) => {
           console.log('Login error', err);
           this.router.navigate(['/']);
           alert("Invalid UserName or Password");
          
         }
       });
     }
  }
 }


