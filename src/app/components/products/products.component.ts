import { Product } from './../../models/category';
import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  view: 'grid' | 'list' = 'grid';
  sortby: 'default' | 'htl' | 'lth' = 'default';
  products: Product[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let category = params.category;
      let subCategory = params.subcategory;

      if (category && subCategory) {
        this.navigationService
          .getProducts(category, subCategory, 10)
          .subscribe((res: any) => {
            this.products = res;
          });
      }
    });
  }

  sortByPrice(sortkey: string) {
    this.products.sort((a, b) => {
      if (sortkey === 'default') {
        return a.id > b.id ? 1 : -1;
      } else if (sortkey === 'htl') {
        if (
          this.utilityService.applyDiscount(a.price, a.offer.discount) >
          this.utilityService.applyDiscount(b.price, b.offer.discount)
        )
          return -1;
        else return 1;
      } else if (sortkey === 'lth') {
        if (
          this.utilityService.applyDiscount(a.price, a.offer.discount) <
          this.utilityService.applyDiscount(b.price, b.offer.discount)
        )
          return -1;
        else return 1;
      }
      return 0;
    });
  }
}
