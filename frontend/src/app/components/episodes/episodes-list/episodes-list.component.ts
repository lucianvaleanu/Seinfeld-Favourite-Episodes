import { Component } from '@angular/core';
import { Episode } from "../../../models/episode";
import { EpisodeService } from "../../../services/episode.service";
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.css']
})

export class EpisodesComponent {
  episodes: Episode[] = [];
  pageSize = 12;
  p = 1;
  episodesCount = 0;
  season?: number;
  episodeToFind?: string;
  totalCountSubscription: Subscription | undefined;

  userID!: number;

  constructor(private episodeService: EpisodeService,
    private authService: AuthService) { }


  ngOnInit(): void {
    this.getEpisodesByPage();
    this.getTotalCount();
    this.userID = this.authService.userID;
  }

  onRatingSelection(rating:number) {
    rating = Number(rating);
    this.episodeService.getEpisodesByRating(rating).subscribe((filteredEpisodes) => {
      this.episodes = filteredEpisodes;
      this.p = 1;
      this. episodesCount = this.episodes.length;
    })
  }

  onSeasonChange(newSeason: number): void {
    this.episodeToFind = undefined;
    this.season = newSeason;
    this.filterBySeason();
  }


  
  getTotalCount(): void {
    this.totalCountSubscription = this.episodeService.getTotalCount().subscribe((count: number) => {
      this.episodesCount = count;
    });
  }

  getAllRatings() {
    this.getEpisodesByPage();
    this.getTotalCount();
  }

  filterBySeason() {
    this.episodeService.filterBySeason(this.season).subscribe((filteredEpisodes) => {
      this.episodes = filteredEpisodes;
      this.p = 1;
      this. episodesCount = this.episodes.length;
    })
  }

  searchEpisode(episodeInput: string): void {
    this.season = undefined;
    this.episodeToFind = episodeInput;
    this.getEpisodeFromSearch();
  }

  getEpisodeFromSearch(): void {
    this.episodeService.searchEpisode(this.p, this.pageSize, this.episodeToFind).subscribe((foundEpisode) => {
      this.episodes = foundEpisode;
      this.p = 1;
      this. episodesCount = this.episodes.length;
    });
  }

  getEpisodesByPage(): void {
    this.episodeService.getEpisodesByPage(this.p, this.pageSize).subscribe((paginatedEpisodes) => {
      this.episodes = paginatedEpisodes;
    });
  }

  getEpisodes(): void {
    this.episodeService.getEpisodes().subscribe((response: any) => {
      this.episodes = response;
    });
  }

  transformString(input: string): string {
    return this.episodeService.transformString(input);
  }

  onPageChange(pageNumber: number): void {
    this.p = pageNumber;
    this.getEpisodesByPage();
  }

  setPageSize(newSize: number): void {
    this.pageSize = newSize;
    this.getEpisodesByPage();
  }

}
