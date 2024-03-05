import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { bloodbank } from 'src/shared/models/bloodbank';
import { BloodbankService } from 'src/shared/services/bloodbank.service';

@Component({
  selector: 'app-addbloodbank',
  templateUrl: './addbloodbank.component.html',
  styleUrls: ['./addbloodbank.component.scss']
})
export class AddbloodbankComponent implements OnInit {
  bloodBankForm!: FormGroup;
  inputData: bloodbank;

  constructor(private formBuilder: FormBuilder, private bloodbankservice: BloodbankService) {
  }  
  ngOnInit() : void{
    this.createBloodBankForm();
  }

  createBloodBankForm() : void{
    this.bloodBankForm = this.formBuilder.group({
      srNo: ['', Validators.required],
      bloodbankname: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.required],
      nodalofficer: ['', Validators.required],
      operationalhours: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
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
      price: ['', Validators.required]
    
    });
  }

  onSubmit() {
    if (this.bloodBankForm.valid) {
      console.log("inside if");
      this.getLocation();
      const bloodBankData = this.bloodBankForm.value;
      console.log(bloodBankData);
      this.bloodbankservice.addBloodBank(bloodBankData).subscribe(
        (response: any) => {
          console.log("Blood bank added successfully.");
        },
        (error) => {
          console.error("Error adding blood bank:", error);
        }
      );
    }
    return;
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.error(longitude, latitude);
      });
    } else {
      console.log("No support for geolocation")
    }
  }

}
