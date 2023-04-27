import { Review } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/category';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  imageIndex: number = 1;
  product!: Product;
  reviewControl = new FormControl('');
  showErrorMessage: boolean = false;
  reviewSubmitted: boolean = false;
  reviewSaved: boolean = false;
  Reviews: Review[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getProduct(id).subscribe((res: any) => {
        this.product = res;
        this.fetchAllReviews();
      });
    });
  }

  submitReview() {
    let review = this.reviewControl.value;
    if (review == null || review.trim() == '') {
      this.showErrorMessage = true;
      return;
    }

    let userid = this.utilityService.getUser().id;
    let productid = this.product.id;

    this.navigationService
      .submitReview(userid, productid, review)
      .subscribe((res) => {
        this.reviewSaved = true;
        this.reviewSubmitted = true;
        this.fetchAllReviews();
        this.reviewControl.setValue('');
      });
  }

  fetchAllReviews() {
    this.Reviews = [];
    this.navigationService
      .getAllReviewsOfProduct(this.product.id)
      .subscribe((res: any) => {
        res.forEach((review: any) => {
          this.Reviews.push(review);
        });
      });
  }
}
