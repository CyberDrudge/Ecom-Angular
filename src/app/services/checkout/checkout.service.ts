import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiURL: string = environment.apiUrl;
  checkoutURL: string = '/cart/checkout';

  constructor(private httpClient: HttpClient) { }

  public getCheckoutDetails(context){
    return this.httpClient.post<any>(
      this.apiURL+this.checkoutURL, context
    );
  }

}
