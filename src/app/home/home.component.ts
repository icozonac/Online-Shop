import { SuggestedProduct } from './../models/category';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  suggestedProducts: SuggestedProduct[] = [
    {
      banerimage: '/../../../assets/images/baner/mobile-baner.png',
      category: {
        id: 0,
        category: 'electronics',
        subCategory: 'mobiles',
      },
    },
    {
      banerimage: '/../../../assets/images/baner/laptop-baner.jpg',
      category: {
        id: 1,
        category: 'electronics',
        subCategory: 'laptops',
      },
    },
    {
      banerimage: '/../../../assets/images/baner/chair-baner.png',
      category: {
        id: 2,
        category: 'furniture',
        subCategory: 'chairs',
      },
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
