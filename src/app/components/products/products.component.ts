import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsList: any;
  subscriptions: any = [];

  constructor(
      public productsService: ProductsService,
      public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.getCart();
    this.getProductsList();
  }

  private getProductsList(){
    this.subscriptions.push(this.productsService.getProducts().subscribe(res =>{
      if (res.type == 'success'){
        this.productsList = res.data;
      }
      else{
        this.productsList = null;
      }
      this.productsService.isProductsLoading = false;
    }));
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
