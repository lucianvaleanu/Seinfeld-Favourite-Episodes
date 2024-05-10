import { TestBed } from '@angular/core/testing';

import { ReviewsUpdateService } from '../src/app/services/reviews-update.service';

describe('ReviewsUpdateService', () => {
  let service: ReviewsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewsUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
