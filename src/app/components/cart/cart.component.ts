import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/category';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Payment } from 'src/app/models/category';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  usersCart: Cart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: '',
  };

  usersPreviousCarts: Cart[] = [];

  usersPaymentInfo: Payment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: '',
    },
    totalAmount: 0,
    shipingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };

  constructor(
    public utilityService: UtilityService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.setCart();
  }

  removeFromCart(idProduct: any) {
    this.setCart();
  }

  setCart() {
    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersCart = res;

        this.utilityService.calculatePayment(
          this.usersCart,
          this.usersPaymentInfo
        );

        this.navigationService
          .getAllPreviousCarts(this.utilityService.getUser().id)
          .subscribe((res: any) => {
            this.usersPreviousCarts = res;
          });
      });
  }
}
