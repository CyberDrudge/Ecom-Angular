import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(){
    this.cartService.getCartitems().subscribe(res => {
      if (res.type == 'success'){
        this.cart = res.data;
      } else {
        this.cart = null;
      }
      localStorage.setItem("cart_id", JSON.stringify(this.cart.id));
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.cartService.isCartLoading = false;
    })
  }

}
