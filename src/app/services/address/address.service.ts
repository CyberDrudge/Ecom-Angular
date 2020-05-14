import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiURL: string = environment.apiUrl;
  addAddressUrl:string = '/checkout/address/create/';
  constructor(private httpClient: HttpClient) { }

  public addAddress(addressFormData){
    return this.httpClient.post<any>(
      this.apiURL+this.addAddressUrl, addressFormData
    );
  }
}
