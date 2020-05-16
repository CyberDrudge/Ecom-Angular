import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiURL: string = environment.apiUrl;
  addAddressUrl:string = '/checkout/address/create/';
  getAddressesUrl:string = '/addresses';
  constructor(private httpClient: HttpClient) { }

  public addAddress(addressFormData){
    return this.httpClient.post<any>(
      this.apiURL+this.addAddressUrl, addressFormData
    );
  }

  public getAddresses(){
    return this.httpClient.get<any>(
      this.apiURL+this.getAddressesUrl
    )
  }
}
