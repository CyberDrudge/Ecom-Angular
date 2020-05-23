import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-add-remove-product',
  templateUrl: './add-remove-product.component.html',
  styleUrls: ['./add-remove-product.component.scss']
})
export class AddRemoveProductComponent implements OnInit, OnDestroy {
  @Input() product: any;
  @Input() removeOnly: boolean = false;
  isProductInCart: boolean = false;
  subscriptions: any = [];

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.checkInCart(this.product);
  }

  updateCart(id?: string){
    this.isProductInCart = !this.isProductInCart;
    this.subscriptions.push(this.cartService.updateCartItems(id).subscribe(res => {
      if (res.type == 'success'){
        this.cartService.cart = res.data;
        localStorage.setItem("cart_id", JSON.stringify(res.data.id));
      }
    }));
  }

  checkInCart(product: any){
    let t = 0;
    while (this.cartService.isCartLoading && t<100){
      t += 1;
    }
    if (this.cartService.cart.products){
      for (let i=0; i < this.cartService.cart.products.length; i++){
        if (product.id == this.cartService.cart.products[i].id){
          this.isProductInCart = true;
          return;
        }
      }
    }
    this.isProductInCart = false;
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
