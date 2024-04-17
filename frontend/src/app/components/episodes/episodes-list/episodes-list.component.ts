import { Component, SimpleChanges } from '@angular/core';
import { Episode } from "../../../models/episode";
import { EpisodeService } from "../../../services/episode.service";
import { Subscription } from 'rxjs';

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
  private totalCountSubscription: Subscription | undefined;

  constructor(private episodeService: EpisodeService) { }

  onRatingSelection(rating:number) {
    rating = Number(rating);
    this.episodeService.getEpisodesByRating(rating).subscribe((filteredEpisodes) => {
      this.episodes = filteredEpisodes;
    })
  }

  onSeasonChange(newSeason: number): void {
    this.episodeToFind = undefined;
    this.season = newSeason;
    this.filterBySeason();
  }

  ngOnInit(): void {
    this.getEpisodesByPage();
    this.getTotalCount();
  }
  
  getTotalCount(): void {
    this.totalCountSubscription = this.episodeService.getTotalCount().subscribe((count: number) => {
      this.episodesCount = count;
    });
  }

  filterBySeason() {
    this.episodeService.filterBySeason(this.season).subscribe((filteredEpisodes) => {
      this.episodes = filteredEpisodes;
    })
  }

  searchEpisode(episodeInput: string): void {
    this.season = undefined;
    this.episodeToFind = episodeInput;
    this.getEpisodeFromSearch();
  }

  getEpisodeFromSearch(): void {
    this.episodeService.searchEpisode(this.episodeToFind).subscribe((foundEpisode) => {
      this.episodes = foundEpisode;
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
