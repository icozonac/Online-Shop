import { Router } from '@angular/router';
import { Category } from '../../models/category';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OpenProducts]',
})
export class OpenProductsDirective {
  constructor(private router: Router) {}

  @Input() category: Category = {
    id: 0,
    category: '',
    subCategory: '',
  };

  @HostListener('click') openProducts() {
    this.router.navigate(['/products'], {
      queryParams: {
        category: this.category.category,
        subcategory: this.category.subCategory,
      },
    });
  }
}
