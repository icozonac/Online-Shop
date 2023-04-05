import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  view: 'grid' | 'list' = 'grid';
  sortby: 'default' | 'htl' | 'lth' = 'default';

  constructor() {}

  ngOnInit(): void {}
}
