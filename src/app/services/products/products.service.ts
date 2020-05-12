import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL: string = environment.apiUrl;
  isProductsLoading: boolean = false;
  
  constructor(private httpClient: HttpClient) { }

  public getProducts = () => {
    this.isProductsLoading = true;
    return this.httpClient.get<any>(
      `${this.apiURL}/products/`
    );
  };

  public getProductDetails = (slug: string) => {
    this.isProductsLoading = true;
    console.log("Get Details");
    return this.httpClient.get<any>(
      `${this.apiURL}/products/${slug}`
    );
  };

}
