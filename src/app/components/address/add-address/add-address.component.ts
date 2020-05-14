import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router"
import { AddressService } from 'src/app/services/address/address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  addressForm = this.fb.group({
    // nickname: [''],
    name: ['', [Validators.required]],
    // address_type: ['', [Validators.required]],
    address_line1: ['', Validators.required],
    address_line2: [''],
    city: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    postal_code: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.addAddress();
  }

  addAddress(){
    this.addressService.addAddress(this.addressForm.value).subscribe(res => {
      this.router.navigate(['/address'])
    });
  }

}
