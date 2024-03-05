import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { user } from 'src/shared/models/user';
import { AppserviceService } from 'src/shared/services/appservice.service';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {
  user: user;

  constructor(
    public dialogRef: MatDialogRef<ViewuserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private userService: AppserviceService
  ) {

  }

  ngOnInit(): void {
    console.error(this.data)
    this.userService.getUserById(this.data).subscribe(userr => {
      console.log("after subscription");
      console.log(userr);
       this.user = userr;
       console.log("after initialization");
       console.log(this.user);

     });
  }

  // Method to format the adhaar number to show only the last three digits
  formatAdhaar(adhaar: string): string {
    return '***' + adhaar.slice(-3);
  }

}
