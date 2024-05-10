import { Component } from '@angular/core';
import { EpisodeService } from '../../../services/episode.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-episode-add',
  templateUrl: './episode-add.component.html',
  styleUrl: './episode-add.component.css'
})
export class EpisodeAddComponent {
  newEpisodeTitle: string = "";
  newEpisodeSeason?: number = undefined;
  newEpisodeEp?: number = undefined;
  newEpisodeRating?: number = undefined;

  constructor(
    private episodeService: EpisodeService,
    private location: Location
  ) { }

  onAdd(): void {
    if (this.newEpisodeTitle !== undefined && this.newEpisodeSeason !== undefined && this.newEpisodeEp !== undefined && this.newEpisodeRating !== undefined) {
      this.episodeService.addEpisode(this.newEpisodeTitle.trim(), this.newEpisodeSeason, this.newEpisodeEp, this.newEpisodeRating).subscribe(() => {
        this.location.back();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
