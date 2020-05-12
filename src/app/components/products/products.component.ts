import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsList: any;
  cartItems: any;
  constructor(
      public productsService: ProductsService,
      public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCartItems();
    this.getProductsList();
  }

  private getProductsList(){
    this.productsService.getProducts().subscribe(res =>{
      if (res.type == 'success'){
        this.productsList = res.data;
      }
      else{
        this.productsList = null;
      }
      this.productsService.isProductsLoading = false;
    });
  }

  getCartItems(){
    this.cartItems = JSON.parse(localStorage.getItem("cart"));
  }

}
