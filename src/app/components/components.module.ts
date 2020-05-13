import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { AddRemoveProductComponent } from './products/add-remove-product/add-remove-product.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    CartComponent,
    AddRemoveProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    RouterModule
  ]
})
export class ComponentsModule { }
