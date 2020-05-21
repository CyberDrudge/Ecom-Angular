import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-add-remove-product',
  templateUrl: './add-remove-product.component.html',
  styleUrls: ['./add-remove-product.component.scss']
})
export class AddRemoveProductComponent implements OnInit {
  @Input() product: any;
  isProductInCart: boolean = false;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.checkInCart(this.product);
  }

  updateCart(id?: string){
    console.log("Updating Cart: " + id);
    this.isProductInCart = !this.isProductInCart;
    console.log(this.isProductInCart);
    this.cartService.updateCartItems(id).subscribe(res => {
      if (res.type == 'success'){
        this.cartService.cart = res.data;
        localStorage.setItem("cart_id", JSON.stringify(res.data.id));
      }
    });
  }

  checkInCart(product: any){
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
}
