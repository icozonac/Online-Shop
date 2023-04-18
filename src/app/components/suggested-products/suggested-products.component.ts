import { NavigationService } from './../../services/navigation.service';
import { Category, Product } from './../../models/category';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrls: ['./suggested-products.component.scss'],
})
export class SuggestedProductsComponent implements OnInit {
  products: Product[] = [];
  @Input() count: number = 4;
  @Input() catergory: Category = {
    id: 0,
    category: '',
    subCategory: '',
  };

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService
      .getProducts(
        this.catergory.category,
        this.catergory.subCategory,
        this.count
      )
      .subscribe((res: any[]) => {
        for (let product of res) {
          this.products.push(product);
        }
      });
  }
}
