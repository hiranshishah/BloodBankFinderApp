import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup ,FormControl, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { user } from 'src/shared/models/user';
import { AppserviceService } from 'src/shared/services/appservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  @Output() userRegistered = new EventEmitter<string>();
 
  constructor(public dialogRef: MatDialogRef<SignupComponent>, public snackBar:MatSnackBar, public router: Router,public dialog: MatDialog, public userService: AppserviceService) { }
 
  ngOnInit(): void {
     this.registerForm = new FormGroup({
       user_name: new FormControl('', Validators.required),
       user_email: new FormControl('', [Validators.required, Validators.email]),
       user_phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
       user_id: new FormControl('', Validators.required),
       user_password: new FormControl('', Validators.required),
       user_age: new FormControl('', Validators.required),
       user_gender: new FormControl('', Validators.required),
       user_adhaar: new FormControl('', Validators.required),
       user_address: new FormControl('', Validators.required),
       user_role:new FormControl('',Validators.required)
     });
  }
 
  onSignUp(): void {
     if (this.registerForm.valid) {
       const userData: user = this.registerForm.value;
       this.userService.addUser(userData).subscribe(
         response => {
           console.log('User registered successfully:', response);
           this.dialogRef.close();
           this.snackBar.open(`${this.registerForm.get('user_name').value} registered Successfully.`, 'OK', {
            duration: 3000,
            panelClass: ['success-snackbar']
           });
           this.router.navigate(['/']);
           this.userService.setValue(userData.user_id);
         },
         error => {
           console.error('Error registering user:', error);
           this.snackBar.open('Invalid Entries', 'OK', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
         }
       );
     }
  }
 }
