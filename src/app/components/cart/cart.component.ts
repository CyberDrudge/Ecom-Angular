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
    this.cartService.getCart();
    console.log(this.cartService.cart);
  }
}
