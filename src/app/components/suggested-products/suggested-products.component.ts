import { Category } from './../../models/category';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrls: ['./suggested-products.component.scss']
})
export class SuggestedProductsComponent implements OnInit {


  @Input() count: number = 4;

  constructor() { }

  ngOnInit(): void {
  }

  @Input() catergory: Category={
    id: 0,
    category: '',
    subcategory: ''
  };



}
