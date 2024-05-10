import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsUpdateService {
  private reviewAddedSource = new Subject<void>();

  reviewAdded$ = this.reviewAddedSource.asObservable();

  private reviewUpdatedSource = new Subject<void>();

  reviewUpdated$ = this.reviewUpdatedSource.asObservable();

  announceReviewAdded() {
    this.reviewAddedSource.next();
  }

  
  announceReviewUpdated() {
    this.reviewUpdatedSource.next();
  }
}
