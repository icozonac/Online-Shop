import { Category, CategoryResponse, Product } from './../models/category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  baseUrl = 'https://localhost:7206/api/Shopping/';

  constructor(private http: HttpClient) {}

  getCategoryList() {
   let url = this.baseUrl + 'GetProductCategories';
  
    return this.http.get<CategoryResponse[]>(url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: Category = {
            id: category.id,
            category: category.category,
            subCategory: category.subCategory,
          };
          return mappedCategory;
        })
      )
    );
  }
  
  getProducts(category: string, subCategory: string, count: number) {
    return this.http.get<Product[]>(this.baseUrl + 'GetProducts',{
      params: new HttpParams()
        .set('category', category)
        .set('subCategory', subCategory)
        .set('count', count)
    });
  }
}
