import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { bloodbank } from 'src/shared/models/bloodbank';
import { BloodbankService } from 'src/shared/services/bloodbank.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updatebloodbank',
  templateUrl: './updatebloodbank.component.html',
  styleUrls: ['./updatebloodbank.component.scss']
})
export class UpdatebloodbankComponent implements OnInit {
  bloodBankForm: FormGroup;
  bloodBankId: string;
  bloodBank: bloodbank;
  currentbloodbank:bloodbank;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: bloodbank,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private bloodBankService: BloodbankService,
    private dialogRef: MatDialogRef<UpdatebloodbankComponent>
  ) { }

  ngOnInit() {
    this.getform();
   
    this.forminsert();

  }
  getform():void{
    this.bloodBankService.getbloodbankbyid(this.data.srNo).subscribe({
      next:(data)=>{
        this.currentbloodbank=data;
        console.log(this.currentbloodbank);
        // this.bloodBankForm.patchValue(this.currentbloodbank);
      },
      error:(err)=>{
        console.log("Error logged!");
      }
    });
  }


  forminsert():void{ 
    this.bloodBankForm = this.formBuilder.group({
      srNo: [this.data.srNo],
      bloodbankname: [this.data.bloodbankname],
      state: [this.data.state],
      city: [this.data.city],
      address: [this.data.address],
      pincode: [this.data.pincode],
      contact: [this.data.contact],
      email: [this.data.email],
      nodalofficer: [this.data.nodalofficer],
      operationalhours: [this.data.operationalhours],
      latitude: [this.data.latitude],
      longitude: [this.data.longitude],
      bloodtypes: this.formBuilder.group({
        a_p: [this.data.bloodtypes['a_p'] ?? 0],
        a_m: [this.data.bloodtypes['a_m' ]?? 0],
        b_p: [this.data.bloodtypes['_p'] ?? 0],
        b_m: [this.data.bloodtypes['b_m ']?? 0],
        aB_p: [this.data.bloodtypes['bB_p'] ?? 0],
        aB_m: [this.data.bloodtypes['aB_m'] ?? 0],
        o_p: [this.data.bloodtypes['o_p'] ?? 0],
        o_m: [this.data.bloodtypes['o_m'] ?? 0]
      }),
      price: [this.data.price]
    });

    console.error({a_p: [this.data.bloodtypes.A_p || false],
      a_m: [this.data.bloodtypes.A_m || false],
      b_p: [this.data.bloodtypes.B_p || false],
      b_m: [this.data.bloodtypes.B_m || false],
      aB_p: [this.data.bloodtypes.AB_p || false],
      aB_m: [this.data.bloodtypes.AB_m || false],
      o_p: [this.data.bloodtypes.O_p || false],
      o_m: [this.data.bloodtypes.O_m || false]});
  }

  onSubmit() {
    console.error(this.bloodBankForm.value);
  
    if (this.bloodBankForm.valid) {
      console.log("blood bank is valid");
      const updatedBloodBank: bloodbank = this.bloodBankForm.value;
      console.log(updatedBloodBank);
      updatedBloodBank.srNo = this.bloodBankId;
      const updatedData: bloodbank = {
        srNo: "" + this.bloodBankForm.get('srNo').value,
        bloodbankname: "" + this.bloodBankForm.get('bloodbankname').value,
        state: "" + this.bloodBankForm.get('state').value,
        city: "" + this.bloodBankForm.get('city').value,
        address: "" + this.bloodBankForm.get('address').value,
        pincode:this.bloodBankForm.get('pincode').value,
        contact:this.bloodBankForm.get('contact').value,
        email: "" + this.bloodBankForm.get('email').value,
        nodalofficer: "" + this.bloodBankForm.get('nodalofficer').value,
        operationalhours: "" + this.bloodBankForm.get('operationalhours').value,
        latitude: this.bloodBankForm.get('latitude').value,
        longitude: this.bloodBankForm.get('longitude').value,
        BRIMSTONE: 123,
        bloodtypes: {
          A_p: this.bloodBankForm.get('bloodtypes').get('a_p').value,
          B_p: this.bloodBankForm.get('bloodtypes').get('b_p').value,
          AB_p: this.bloodBankForm.get('bloodtypes').get('aB_p').value,
          O_p: this.bloodBankForm.get('bloodtypes').get('o_p').value,
          A_m: this.bloodBankForm.get('bloodtypes').get('a_m').value,
          B_m: this.bloodBankForm.get('bloodtypes').get('b_m').value,
          AB_m: this.bloodBankForm.get('bloodtypes').get('aB_m').value,
          O_m: this.bloodBankForm.get('bloodtypes').get('o_m').value
        },
        price: this.bloodBankForm.get('price').value
      };
      this.bloodBankService.updateBloodBank(updatedData.srNo,updatedData).subscribe({
        next:(response) => {
          console.log("Blood bank updated successfully.");
          this.snackBar.open('Blood Bank Updated Successfully.', 'OK', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            
          });
          
          this.router.navigate['/user']
          this.dialogRef.close();
        },
        error:(err) => {

          console.error("Error updating the blood bank:", err);
          this.snackBar.open('Failed to Update Blood Bank.', 'OK', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.router.navigate['/user']
        }
    });
    }
  }

  cancelUpdate(): void {
    this.dialogRef.close(false);
  }
}
