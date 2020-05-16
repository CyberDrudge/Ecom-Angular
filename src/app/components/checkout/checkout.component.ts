import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutDetails: any;
  isCheckoutDone: boolean = false;
  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.getCheckoutDetails();
  }

  getCheckoutDetails(){
    let cart_id = JSON.parse(localStorage.getItem('cart_id'));
    let billing_address_id = JSON.parse(localStorage.getItem('billing_address'));
    let shipping_address_id = JSON.parse(localStorage.getItem('shipping_address'));
    console.log(cart_id, billing_address_id, shipping_address_id);
    let context = {
      'cart_id': cart_id,
      'billing_address_id': billing_address_id,
      'shipping_address_id': shipping_address_id
    }
    this.checkoutService.getCheckoutDetails(context).subscribe(res =>{
      if (res.type == "success"){
        this.checkoutDetails = res.data;
      } else {
        this.checkoutDetails = null;
      }
      console.log(this.checkoutDetails);
    });
  }

  checkout(){
    console.log("Checking Out");
    this.isCheckoutDone = !this.isCheckoutDone;
  }

}
