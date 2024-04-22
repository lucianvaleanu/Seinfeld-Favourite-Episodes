import { Injectable } from '@angular/core';
import { Review } from "../models/review";
import { Observable, map, switchMap } from "rxjs";
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private webReqService: WebRequestService) { }

  getAllReviews(): Observable<Review[]> {
    return this.webReqService.get('reviews').pipe(
      map((response:any)=>{
        return response.map((review: any)=>({
            reviewID: review.reviewID,
            episodeID: review.episodeID,
            text: review.text,
            title: review.title
        }));
      })
    );
  }

  getReviewsByEpisode(episodeTitle: string): Observable<Review[]> {
    return this.webReqService.get(`episodes/title/${this.transformString(episodeTitle)}`).pipe(
      switchMap((episodeResponse: any) => {
        const episodeID = episodeResponse.id;
        return this.webReqService.get(`reviews/ep/${episodeID}`).pipe(
          map((reviewResponse: any) => {
            return reviewResponse.map((review: any) => ({
              reviewID: review.reviewID,
              episodeID: review.episodeID,
              text: review.text,
              title: review.title
            }));
          })
        );
      })
    );
  }

  getReviewByID(reviewID: number): Observable<Review> {
    return this.webReqService.get(`reviews/id/${reviewID}`).pipe(
      map((response: any) => ({
        reviewID: response.reviewID,
        episodeID: response.episodeID,
        text: response.text,
        title: response.title
      }))
    );
  }

  addReview(episodeID: number, text: string, title: string): Observable<Review> {
    const reviewData = {
      episodeID,
      text,
      title
    };
    return this.webReqService.post('reviews', reviewData).pipe(
      map((response: any) => ({
        reviewID: response.reviewID,
        episodeID: response.episodeID,
        text: response.text,
        title: response.title
      }))
    );
  }

  updateReview(reviewID: number, episodeID: number, newText: string, newTitle: string): Observable<void> {
    const reviewData = {
      reviewID,
      episodeID,
      text: newText,
      title: newTitle
    };
    return this.webReqService.put(`reviews/id/${reviewID}`, reviewData).pipe(
      map(()=>{
        return undefined;
      })
    );
  }

  deleteReviewByID(reviewID: number): Observable<void> {
    return this.webReqService.delete(`reviews/id/${reviewID}`).pipe(
      map(() => undefined));
  }
  transformString(input: string): string {
    let transformedString = input.trim();
    transformedString = transformedString.replace(/\s+/g, '-');
    transformedString = transformedString.toLowerCase();
    return transformedString;
  }
}
