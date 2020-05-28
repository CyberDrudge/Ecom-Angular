import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { AddressService } from 'src/app/services/address/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {
  addresses: any;
  billing_address: any;
  shipping_address: any;
  subscriptions: any = [];

  addressForm = this.fb.group({
    address: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses(){
    this.subscriptions.push(this.addressService.getAddresses().subscribe(res => {
      if (res.type == "success"){
        this.addresses = res.data;
      } else {
        this.addresses = null;
      }
    }));
  }

  onSubmit(){
    let billing_address = this.addresses[this.billing_address].id;
    let shipping_address = this.addresses[this.shipping_address].id;
    console.log(billing_address, shipping_address);
    localStorage.setItem("billing_address", JSON.stringify(billing_address));
    localStorage.setItem("shipping_address", JSON.stringify(shipping_address));
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
