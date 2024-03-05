import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { bloodbank } from 'src/shared/models/bloodbank';
import { BloodbankService } from 'src/shared/services/bloodbank.service';

@Component({
  selector: 'app-updatebloodbank',
  templateUrl: './updatebloodbank.component.html',
  styleUrls: ['./updatebloodbank.component.scss']
})
export class UpdatebloodbankComponent implements OnInit {
  bloodBankForm: FormGroup;
  bloodBankId: string;
  bloodBank: bloodbank[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bloodBankService: BloodbankService
  ) { }

  ngOnInit() {
    this.bloodBankForm = this.formBuilder.group({
      srNo: [''],
      bloodbankname: [''],
      state: [''],
      city: [''],
      address: [''],
      pincode: [''],
      contact: [''],
      email: [''],
      nodalofficer: [''],
      operationalhours: [''],
      latitude: [''],
      longitude: [''],
      bloodtypes: this.formBuilder.group({
        A_p: [0],
        A_m: [0],
        B_p: [0],
        B_m: [0],
        AB_p: [0],
        AB_m: [0],
        O_p: [0],
        O_m: [0]
      }),
      price: ['']
    });

    this.bloodBankId = this.route.snapshot.params['srNo'];
    this.getBloodbankById();
  }

  // createForm() {
  //   this.bloodBankForm = this.formBuilder.group({
  //     srNo: [''],
  //     bloodbankname: [''],
  //     state: [''],
  //     city: [''],
  //     address: [''],
  //     pincode: [''],
  //     contact: [''],
  //     email: [''],
  //     nodalofficer: [''],
  //     operationalhours: [''],
  //     latitude: [''],
  //     longitude: [''],
  //     bloodtypes: this.formBuilder.group({
  //       A_p: [0],
  //       A_m: [0],
  //       B_p: [0],
  //       B_m: [0],
  //        AB_p: [0],
  //       AB_m: [0],
  //       O_p: [0],
  //       O_m: [0]
  //     }),
  //     price: ['']

  //   });
  // }

  // getbloodbankbyid(bloodBankId: string) {
  //   this.bloodBankService.getbloodbankbyid(bloodBankId).subscribe(
  //     (bloodBank: bloodbank[]) => {
  //       this.bloodBankForm.patchValue(bloodBank);
  //     },
  //     (error) => {
  //       console.error("Error retreiving the blood bank:", error);
  //     }
  //   );
  //   return this.bloodBankForm;
  // }
  getBloodbankById() {
    this.bloodBankService.getbloodbankbyid(this.bloodBankId).subscribe(
      (response: bloodbank[]) => {
        this.bloodBank = response;
        this.bloodBankForm.patchValue(this.bloodBank);
      },
      (error) => {
        console.error('Error retrieving the blood bank:', error);
      }
    );
  }


  onSubmit() {
    if (this.bloodBankForm.valid) {
      const updatedBloodBank: bloodbank = this.bloodBankForm.value;
      updatedBloodBank.srNo = this.bloodBankId;
      this.bloodBankService.updateBloodBank(updatedBloodBank.srNo,updatedBloodBank).subscribe(
        (response: any) => {
          console.log("Blood bank updated successfully.");
        },
        (error) => {

          console.error("Error updating the blood bank:", error);
        }
      );
    }
  }
}
