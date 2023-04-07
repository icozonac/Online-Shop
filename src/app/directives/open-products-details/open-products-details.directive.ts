import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[OpenDproductsDetails]',
})
export class OpenDproductsDetailsDirective {
  constructor(private router: Router) {}

  @Input() productId: number = 0;

  @HostListener('click') openProductDetails() {
    window.scrollTo(0, 0);
    this.router.navigate(['/product-details'], {
      queryParams: {
        id: this.productId,
      },
    });
  }
}
