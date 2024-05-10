import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsAddComponent } from '../src/app/components/reviews/reviews-add/reviews-add.component';

describe('ReviewsAddComponent', () => {
  let component: ReviewsAddComponent;
  let fixture: ComponentFixture<ReviewsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
