import { Component, OnInit, Input } from '@angular/core';
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
      subcategory: '',
    },
    offer: {
      id: 1,
      title: '',
      discount: 0,
    },
    imageName: '',
  };

  constructor(public utilityService: UtilityService ) {}

  ngOnInit(): void {
    
  }
}
