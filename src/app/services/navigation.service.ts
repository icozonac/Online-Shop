import {
  Category,
  CategoryResponse,
  Order,
  Payment,
  PaymentMethod,
  Product,
  User,
} from './../models/category';
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
    return this.http.get<Product[]>(this.baseUrl + 'GetProducts', {
      params: new HttpParams()
        .set('category', category)
        .set('subCategory', subCategory)
        .set('count', count),
    });
  }

  getProduct(id: number) {
    let url = this.baseUrl + 'GetProduct/' + id;
    return this.http.get(url);
  }

  registerUser(user: User) {
    let url = this.baseUrl + 'RegisterUser';
    return this.http.post(url, user, { responseType: 'text' });
  }

  loginUser(email: string, password: string) {
    let url = this.baseUrl + 'LoginUser';
    return this.http.post(
      url,
      { Email: email, Password: password },
      { responseType: 'text' }
    );
  }

  submitReview(userId: number, productId: number, review: string) {
    let obj: any = {
      User: {
        Id: userId,
      },
      Product: {
        Id: productId,
      },
      Value: review,
    };

    let url = this.baseUrl + 'InsertReview';
    return this.http.post(url, obj, { responseType: 'text' });
  }

  getAllReviewsOfProduct(productId: number) {
    let url = this.baseUrl + 'GetProductReviews/' + productId;
    return this.http.get(url);
  }

  addToCart(userId: number, productId: number) {
    let url = this.baseUrl + 'InsertCartItem/' + userId + '/' + productId;
    return this.http.post(url, null, { responseType: 'text' });
  }

  removeItemFromCart(userId: number, productId: number) {
    let url = this.baseUrl + 'RemoveCartItem/' + productId + '/' + userId;
    return this.http.post(url, null, { responseType: 'text' });
  }

  getActiveCartOfUser(userId: number) {
    let url = this.baseUrl + 'GetActiveCartOfUser/' + userId;
    return this.http.get(url);
  }

  getAllPreviousCarts(userId: number) {
    let url = this.baseUrl + 'GetAllPreviousCartsOfUser/' + userId;
    return this.http.get(url);
  }

  getPaymentMethods() {
    let url = this.baseUrl + 'GetPaymentMethods';
    return this.http.get<PaymentMethod[]>(url);
  }

  insertPayment(payment: Payment) {
    let url = this.baseUrl + 'InsertPayment';
    return this.http.post(url, payment, { responseType: 'text' });
  }

  insertOrder(order: Order) {
    return this.http.post(this.baseUrl + 'InsertOrder', order);
  }
}
