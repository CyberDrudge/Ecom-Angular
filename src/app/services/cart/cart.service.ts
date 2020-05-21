import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiURL: string = environment.apiUrl;
  isCartLoading: boolean = false;
  cart: any = [];
  updateCartUrl: string = '/cart/update';

  constructor(private httpClient: HttpClient) { }

  getCartItems = () => {
    let cart_id = JSON.parse(localStorage.getItem("cart_id"));
    return this.httpClient.post<any>(
      `${this.apiURL}/cart/`, {'cart_id': cart_id}
    );
  };

  // public getCart = () => {
  //   this.isCartLoading = true;
  //   this.getCartItems().subscribe(res => {
  //     if (res.type == "success"){
  //       this.cart = res.data;
  //       localStorage.setItem("cart_id", JSON.stringify(this.cart.id));
  //     }
  //   });
  //   this.isCartLoading = false;
  // }  

  public updateCartItems(id: string){
    let cart_id = JSON.parse(localStorage.getItem("cart_id"));
    return this.httpClient.post<any>(
      this.apiURL+this.updateCartUrl, {'product_id': id, 'cart_id': cart_id}
    );
  }
}
