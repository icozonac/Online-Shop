import { Router } from '@angular/router';
import { Payment, Order } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { Cart, PaymentMethod } from 'src/app/models/category';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  selectedPaymentMethodName: string = '';
  selectedPaymentMethod = new FormControl('0');
  displaySpinner: boolean = false;
  message = '';
  className = '';

  paymentMethods: PaymentMethod[] = [];

  usersCart: Cart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: '',
  };

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

  address: string = '';
  mobile: string = '';

  constructor(
    private navigationService: NavigationService,
    public utilityService: UtilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Get Payment Methods
    this.navigationService.getPaymentMethods().subscribe((res: any) => {
      this.paymentMethods = res;
    });

    this.selectedPaymentMethod.valueChanges.subscribe((res: any) => {
      if (res === '0') this.selectedPaymentMethodName = '';
      else this.selectedPaymentMethodName = res.toString();
    });

    //Get Cart
    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersCart = res;
      });

    //Get Payment Info
    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersCart = res;

        this.utilityService.calculatePayment(
          this.usersCart,
          this.usersPaymentInfo
        );
      });

    this.address = this.utilityService.getUser().address;
    this.mobile = this.utilityService.getUser().mobile;
  }

  getPaymentMethod(id: string) {
    let x = this.paymentMethods.find((v) => v.id === parseInt(id));

    if (x?.provider !== '') return x?.type + ' - ' + x?.provider;
    else return x?.type;
  }

  placeOrder() {
    this.displaySpinner = true;
    let isPaymentSuccessful = this.payMoney();

    if (!isPaymentSuccessful) {
      this.displaySpinner = false;
      this.message = 'Payment Failed!';
      this.className = 'text-danger';
      return;
    }

    let step = 0;
    let count = timer(0, 2000).subscribe((res) => {
      ++step;
      if (step === 1) {
        this.message = 'Processing Payment...';
        this.className = 'text-success';
      }
      if (step === 2) {
        this.message = 'Payment Successful!, Order is being Placed...';
        this.storeOrder();
      }
      if (step === 3) {
        this.message = 'Your Order is Placed!';
        this.displaySpinner = false;
      }
      if (step === 4) {
        this.router.navigateByUrl('/home');
        count.unsubscribe();
      }
    });
  }

  payMoney() {
    return true;
  }

  storeOrder() {
    let payment: Payment;
    let pmid = 0;
    if (this.selectedPaymentMethod.value)
      pmid = parseInt(this.selectedPaymentMethod.value);

    payment = {
      id: 0,
      user: this.utilityService.getUser(),
      paymentMethod: {
        id: pmid,
        type: '',
        provider: '',
        available: false,
        reason: '',
      },
      totalAmount: this.usersPaymentInfo.totalAmount,
      shipingCharges: this.usersPaymentInfo.shipingCharges,
      amountReduced: this.usersPaymentInfo.amountReduced,
      amountPaid: this.usersPaymentInfo.amountPaid,
      createdAt: '',
    };

    this.navigationService
      .insertPayment(payment)
      .subscribe((paymentResponse: any) => {
        payment.id = parseInt(paymentResponse);
        let order: Order = {
          id: 0,
          user: this.utilityService.getUser(),
          cart: this.usersCart,
          payment: payment,
          createdAt: '',
        };

        this.navigationService.insertOrder(order).subscribe((orderResponse) => {
          this.utilityService.changeCart.next(0);
        });
      });
  }
}
