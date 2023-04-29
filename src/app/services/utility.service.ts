import { Payment } from './../models/category';
import { NavigationService } from 'src/app/services/navigation.service';
import { Cart, Product } from 'src/app/models/category';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/category';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  changeCart = new Subject();

  constructor(
    private jwt: JwtHelperService,
    private navigationService: NavigationService
  ) {}

  applyDiscount(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }

  getUser(): User {
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      firstName: token.firstName,
      lastName: token.lastName,
      address: token.address,
      mobile: token.mobile,
      email: token.email,
      password: '',
      createdDate: token.createdAT,
      updatedDate: token.modifiedAT,
    };
    return user;
  }

  setUser(token: string) {
    localStorage.setItem('user', token);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('user');
  }

  addToCart(product: Product) {
    let productId = product.id;
    let userId = this.getUser().id;

    this.navigationService.addToCart(userId, productId).subscribe((res) => {
      if (res.toString() === 'inserted') this.changeCart.next(1);
      else this.changeCart.next(0);
    });
  }

  calculatePayment(cart: Cart, payment: Payment) {
    payment.totalAmount = 0;
    payment.amountPaid = 0;
    payment.amountReduced = 0;

    for (let cartItem of cart.cartItems) {
      payment.totalAmount += cartItem.product.price;

      payment.amountReduced +=
        cartItem.product.price -
        this.applyDiscount(
          cartItem.product.price,
          cartItem.product.offer.discount
        );

      payment.amountPaid += this.applyDiscount(
        cartItem.product.price,
        cartItem.product.offer.discount
      );
    }

    if(payment.amountPaid > 2000) payment.shipingCharges = 0;
    else payment.shipingCharges = 20;
  }
}
