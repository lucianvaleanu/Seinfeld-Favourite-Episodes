import { Component, Input, SimpleChanges } from '@angular/core';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/reviews.service';
import { ReviewsUpdateService } from '../../../services/reviews-update.service';

@Component({
  selector: 'app-review-delete',
  templateUrl: './review-delete.component.html',
  styleUrl: './review-delete.component.css'
})
export class ReviewDeleteComponent {

  @Input() review?: Review;

  constructor(private reviewsService: ReviewService,
    private reviewsUpdateService: ReviewsUpdateService
  ) { }

  onDelete(review: Review) {
    this.reviewsService.deleteReviewByID(review.reviewID).subscribe(() => {
      this.reviewsUpdateService.announceReviewUpdated();
    });
  }
}
