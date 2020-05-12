import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-add-remove-product',
  templateUrl: './add-remove-product.component.html',
  styleUrls: ['./add-remove-product.component.scss']
})
export class AddRemoveProductComponent implements OnInit {
  @Input() product: any;
  @Input() cartItems: any;
  isProductInCart: boolean = false;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.checkInCart(this.product);
  }

  updateCart(id?: string){
    console.log("Updating Cart: " + id);
    this.isProductInCart = !this.isProductInCart;
    console.log(this.isProductInCart);
    this.cartService.updateCart(id).subscribe(res => {
      if (res.type == 'success'){
        localStorage.setItem("cart", JSON.stringify(res.data));
        localStorage.setItem("cart_id", JSON.stringify(res.data.id));
      }
    });
  }

  checkInCart(product: any){
    if (this.cartItems.products){
      for (let i=0; i < this.cartItems.products.length; i++){
        if (product.id == this.cartItems.products[i].id){
          this.isProductInCart = true;
          return;
        }
      }
    }
    this.isProductInCart = false;
  }
}
