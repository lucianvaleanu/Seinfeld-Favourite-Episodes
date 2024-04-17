import { Component } from '@angular/core';
import { Episode } from '../../models/episode';
import { EpisodeService } from '../../services/episode.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  episodes: Episode[] = [];

  constructor(private episodeService: EpisodeService) { }

  ngOnInit(): void {
    this.getEpisodes();
  }

  getEpisodes(): void {
    this.episodeService.getEpisodes().subscribe(episodes => this.episodes = episodes.slice(1, 5));
  }
  transformString(input: string): string {
    return this.episodeService.transformString(input);
  }
}
