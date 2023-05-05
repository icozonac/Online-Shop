import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/category';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class AppProductComponent implements OnInit {
  @Input() view: 'grid' | 'list' | 'cartItem' | 'prevCartItem' = 'grid';
  @Input() product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    productCategory: {
      id: 1,
      category: '',
      subCategory: '',
    },
    offer: {
      id: 1,
      title: '',
      discount: 0,
    },
    imageName: '',
  };
  @Output() cartDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(public utilityService: UtilityService) {}

  ngOnInit(): void {}

  removeFromCart(id: number) {
    this.utilityService.removeFromCart(id).subscribe((res) => {
      
      this.cartDeleted.emit();
    });
  }
}
