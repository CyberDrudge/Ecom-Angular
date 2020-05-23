import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from '../../../services/products/products.service';
import {map} from "rxjs/operators"

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit, OnDestroy {
  productDetails: any;
  details$: any = [];
  slug: any;
  subscriptions: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get("slug")
      this.productDetails = this.getProductDetails(slug);
    })
  }

  getProductDetails(slug){
    this.subscriptions.push(this.productsService.getProductDetails(slug).subscribe(res => {
      if (res.data){
        this.productDetails = res.data;
        console.log(this.productDetails);
      } else{
        this.productDetails = null;
      }
    }));
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
