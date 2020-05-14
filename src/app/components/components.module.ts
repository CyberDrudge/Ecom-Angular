import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { AddRemoveProductComponent } from './products/add-remove-product/add-remove-product.component';
import { AddressComponent } from './address/address.component';
import { AddAddressComponent } from './address/add-address/add-address.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    CartComponent,
    AddRemoveProductComponent,
    AddressComponent,
    AddAddressComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    RouterModule
  ]
})
export class ComponentsModule { }
