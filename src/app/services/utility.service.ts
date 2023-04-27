import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private jwt: JwtHelperService) {}

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
}
