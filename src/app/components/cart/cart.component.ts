import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(){
    this.cartService.getCartItems().subscribe(res => {
      if (res.type == 'success'){
        this.cartService.cart = res.data;
      }
      localStorage.setItem("cart_id", JSON.stringify(this.cartService.cart.id));
      this.cartService.isCartLoading = false;
    })
  }

}
