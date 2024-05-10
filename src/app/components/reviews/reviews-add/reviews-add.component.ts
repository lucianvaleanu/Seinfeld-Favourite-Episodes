import { Component } from '@angular/core';
import { ReviewService } from '../../../services/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from '../../../services/episode.service';
import { Episode } from '../../../models/episode';
import { ReviewsUpdateService } from '../../../services/reviews-update.service';

@Component({
  selector: 'app-reviews-add',
  templateUrl: './reviews-add.component.html',
  styleUrls: ['./reviews-add.component.css']
})
export class ReviewsAddComponent {

  constructor(private route: ActivatedRoute,
    private reviewService: ReviewService,
    private episodesService: EpisodeService,
    private reviewUpdateService: ReviewsUpdateService) { }

    episode?: Episode;

  reviewTitleValue: string = '';
  reviewTextValue: string = '';

  ngOnInit(): void {
    this.getEpisode();
  }

  getEpisode(): void {
    const title = String(this.route.snapshot.paramMap.get('title'));
    this.episodesService.getEpisodeByTitle(title).subscribe((episode) => this.episode = episode);
  }

  addReview() {
    if (this.episode && this.reviewTitleValue) {
      const episodeID: number = this.episode.id;
      this.reviewService.addReview(episodeID, this.reviewTextValue, this.reviewTitleValue)
        .subscribe(() => {
          this.reviewUpdateService.announceReviewAdded();
        });
    }
  }
}
