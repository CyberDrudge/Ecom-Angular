import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutDetails: any;
  isCheckoutDone: boolean = false;
  subscriptions: any = [];

  constructor(private checkoutService: CheckoutService, private router: Router){ }

  ngOnInit(): void {
    this.getCheckoutDetails();
  }

  getCheckoutDetails(){
    let cart_id = JSON.parse(localStorage.getItem('cart_id'));
    let billing_address_id = JSON.parse(localStorage.getItem('billing_address'));
    let shipping_address_id = JSON.parse(localStorage.getItem('shipping_address'));
    if (shipping_address_id == null || billing_address_id == null){
      this.router.navigate(["/address"]);
    }
    console.log(cart_id, billing_address_id, shipping_address_id);
    let context = {
      'cart_id': cart_id,
      'billing_address_id': billing_address_id,
      'shipping_address_id': shipping_address_id
    }
    this.subscriptions.push(this.checkoutService.getCheckoutDetails(context).subscribe(res =>{
      if (res.type == "success"){
        this.checkoutDetails = res.data;
      } else {
        this.checkoutDetails = null;
      }
      console.log(this.checkoutDetails);
    }));
  }

  checkout(){
    console.log("Checking Out");
    this.isCheckoutDone = !this.isCheckoutDone;
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
