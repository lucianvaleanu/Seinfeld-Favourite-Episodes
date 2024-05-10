import { Component } from '@angular/core';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewsUpdateService } from '../../../services/reviews-update.service';


@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent {

  reviews: Review[] = [];
  selectedReview?: Review;

  constructor(private route: ActivatedRoute,
    private reviewService: ReviewService,
    private reviewUpdateService: ReviewsUpdateService) { }

  ngOnInit(): void {
    this.loadReviews();

    this.reviewUpdateService.reviewAdded$.subscribe(() => {
      this.loadReviews();
    });

    this.reviewUpdateService.reviewUpdated$
    .subscribe(() => {
      this.loadReviews(); // Reload reviews when a review is updated
    });
  }

  subscribeToReviewUpdates(): void {
   
  }

  loadReviews(): void {
    const title = String(this.route.snapshot.paramMap.get('title'));
    this.reviewService.getReviewsByEpisode(title).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

}
