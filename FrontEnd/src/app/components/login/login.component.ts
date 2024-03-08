import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(public dialogRef: MatDialogRef<LoginComponent>, public dialog: MatDialog, public userService: AppserviceService, public snackBar: MatSnackBar, public router: Router) { }

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
      this.userService.loginuser(this.loginForm.value).subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', response.token);
          const user = localStorage.getItem('currentUser');
          console.log(user);
          
          sessionStorage.setItem('role', response.user_role);
          console.log("Logged in successfully!");
          console.log(response);
          this.dialogRef.close();
          this.router.navigate(['/']);
          this.snackBar.open('User Logged in Successfully', 'OK', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.userService.setValue(loginData.username)
        },
        error: (err) => {
          console.log('Login error', err);
          this.router.navigate(['/']);
          this.snackBar.open('Invalid Username or Password', 'OK', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });

        }
      });
    }
  }
}


