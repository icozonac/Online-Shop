import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class AppProductComponent implements OnInit {
  @Input() view: 'grid' | 'list' | 'cartItem' | 'prevCartItem'  = 'grid';
  constructor() {}

  ngOnInit(): void {}

}
