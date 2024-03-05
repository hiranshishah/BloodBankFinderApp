import { Component } from '@angular/core';
import { bloodbank } from 'src/shared/models/bloodbank';
import { BloodbankService } from 'src/shared/services/bloodbank.service';

@Component({
  selector: 'app-bloodbank',
  templateUrl: './bloodbank.component.html',
  styleUrls: ['./bloodbank.component.scss']
})
export class BloodbankComponent {

  bloodBanks!: bloodbank[];

  constructor(private bloodBankService: BloodbankService) { }

  ngOnInit() {
    this.getBloodBanks();
  }

  getBloodBanks() {
    this.bloodBankService.getBloodBanks().subscribe(
      (bloodBanks: bloodbank[]) => {
        this.bloodBanks = bloodBanks;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addBloodBank(bloodBank: bloodbank) {
    this.bloodBankService.addBloodBank(bloodBank).subscribe(
      (response) => {
        console.log('Blood bank added successfully');
        // Refresh the blood banks list
        this.getBloodBanks();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteBloodBank(bloodBankId: string) {
    this.bloodBankService.deleteBloodBank(bloodBankId).subscribe(
      (response) => {
        console.log('Blood bank deleted successfully');
        // Refresh the blood banks list
        this.getBloodBanks();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateBloodBank(bloodBankId: string, bloodBank: bloodbank) {
    this.bloodBankService.updateBloodBank(bloodBankId,bloodBank).subscribe(
      (response) => {
        console.log('Blood bank updated successfully');
        // Refresh the blood banks list
        this.getBloodBanks();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
