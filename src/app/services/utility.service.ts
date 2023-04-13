import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  applyDiscount(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }
}
