import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsUpdateComponent } from '../src/app/components/reviews/reviews-update/reviews-update.component';

describe('ReviewsUpdateComponent', () => {
  let component: ReviewsUpdateComponent;
  let fixture: ComponentFixture<ReviewsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
