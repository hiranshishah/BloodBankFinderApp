import { Component, Inject, OnInit } from '@angular/core';
import { BloodbankService } from 'src/shared/services/bloodbank.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { bloodbank } from 'src/shared/models/bloodbank';


@Component({
  selector: 'app-deletebloodbank',
  templateUrl: './deletebloodbank.component.html',
  styleUrls: ['./deletebloodbank.component.scss']
})
export class DeletebloodbankComponent implements OnInit {
  bloodBankId: string;

 constructor(
  @Inject(MAT_DIALOG_DATA) public data: bloodbank,
    private bloodbankService: BloodbankService,
    private snackBar: MatSnackBar,
    private router:Router
 ) {}

 ngOnInit(): void {}

 onDelete(): void {
  const bloodBankId =this.data.srNo;

  // Show confirmation message
  const snackBarRef = this.snackBar.open('Are you sure you want to delete this blood bank?', 'Confirm', {
    duration: 5000,
    panelClass: ['confirmation-snackbar']
  });

  snackBarRef.onAction().subscribe(() => {
    // Proceed with deletion on confirmation
    this.bloodbankService.deleteBloodBank(bloodBankId).subscribe(() => {
      // Show success message
      this.snackBar.open('Blood bank deleted successfully.', 'OK', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        
      });
      this.router.navigate['/user']
    }, error => {
      // Show error message
      this.snackBar.open('Failed to delete blood bank.', 'OK', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      this.router.navigate['/user']
    });
  });
}
}
