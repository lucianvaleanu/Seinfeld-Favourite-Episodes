import { Component, Input, SimpleChanges } from '@angular/core';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/reviews.service';
import { ReviewsUpdateService } from '../../../services/reviews-update.service';

@Component({
  selector: 'app-reviews-update',
  templateUrl: './reviews-update.component.html',
  styleUrls: ['./reviews-update.component.css']
})
export class ReviewsUpdateComponent {

  @Input() review?: Review;

  reviewTitleValue: string = '';
  reviewTextValue: string = '';

  constructor(private reviewService: ReviewService,
    private reviewUpdateService: ReviewsUpdateService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['review'] && this.review) {
      this.reviewTitleValue = this.review.title || '';
      this.reviewTextValue = this.review.text || '';
    }
  }
  onSave(review: Review): void {
    if (review) {
      review.title = this.reviewTitleValue;
      review.text = this.reviewTextValue;
      this.reviewService.updateReview(review.reviewID, review.episodeID, review.text, review.title)
        .subscribe(() => {
          this.reviewUpdateService.announceReviewUpdated();
        });
    }
  }

}
