import { Component, OnInit } from '@angular/core';
import { BloodbankService } from 'src/shared/services/bloodbank.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-deletebloodbank',
  templateUrl: './deletebloodbank.component.html',
  styleUrls: ['./deletebloodbank.component.scss']
})
export class DeletebloodbankComponent implements OnInit {
  bloodBankId: string;

 constructor(
    private bloodbankService: BloodbankService,
    private snackBar: MatSnackBar
 ) {}

 ngOnInit(): void {}

 onDelete(): void {
  const bloodBankId = this.bloodBankId;

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
        panelClass: ['success-snackbar']
      });
    }, error => {
      // Show error message
      this.snackBar.open('Failed to delete blood bank.', 'OK', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    });
  });
}
}
