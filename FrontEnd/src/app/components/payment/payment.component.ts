import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentserviceService } from 'src/shared/services/paymentservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  isProcessingPayment: boolean = false;
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
 
  constructor(private router: Router, private payment: PaymentserviceService) {}
 
  ngOnInit(): void {
     // Initialize the form
     this.paymentForm = new FormGroup({
       amount: new FormControl(null, [Validators.required, Validators.min(1)])
     });
  }
 
  submitPayment(): void {
     if (this.paymentForm.valid) {
      this.isProcessingPayment = true;
       const amount = this.paymentForm.get('amount')?.value;
       window.paypal.Buttons({
         style: {
           layout: 'horizontal',
           color: 'blue',
           shape: 'rect',
           label: 'paypal'
         },
         createOrder: (data: any, actions: any) => {
           return actions.order.create({
             purchase_units: [
               {
                 amount: {
                  value: amount.toString(),
                  currency_code: 'USD',
                 }
               }
             ]
           });
         },
         onApprove: (data: any, actions: any) => {
           return actions.order.capture().then((details: any) => {
             if (details.status === 'COMPLETED') {
               this.payment.transactionId = details.id;
               this.router.navigate(['confirm']);
               console.log(details);
             }
             this.isProcessingPayment = false;
           });
         },
         onError: (error: any) => {
           console.log(error);
           this.isProcessingPayment = false;
         }
       }).render(this.paymentRef.nativeElement);
     } else {
       console.error('Form is not valid');
     }
  }
 
  cancel() {
     this.router.navigate(['/']);
  }
}
