import { Injectable } from '@angular/core';
import { Episode } from "../models/episode";
import { Observable, map, of } from "rxjs";
import { WebRequestService } from './web-request.service';


@Injectable({
  providedIn: 'root'
})
export class EpisodeService {


  episodesList: Episode[] = [];

  constructor(private webReqService: WebRequestService) { }

  addEpisode(title: string, season: number, episode_number: number, rating: number): Observable<Episode> {

    const episodeData = {
      title: title,
      season: season,
      episode_number: episode_number,
      rating: rating
    };
    return this.webReqService.post('episodes', episodeData).pipe(
      map((response: any) => ({
        id: response.id,
        title: response.title,
        season: response.season,
        episode_number: response.episode_number,
        rating: response.rating,
        image: response.image
      }))
    );
  }

  updateEpisode(id: number, updatedEpisode: Episode): Observable<void> {
    const payload = {title: updatedEpisode.title, 
      season: updatedEpisode.season,
      episode_number: updatedEpisode.episode_number, 
      rating: updatedEpisode.rating
    };

    return this.webReqService.put(`episodes/id/${id}`, payload).pipe(
      map(() => {
        return undefined;
      })
    );
  }

  getEpisodesByRating(rating: number): Observable<Episode[]> {
    return this.webReqService.get(`episodes/rating/${rating}`).pipe(
      map((response: any) => {
        return response.map((episode: any) => ({
          id: episode.id,
          title: episode.title,
          season: episode.season,
          episode_number: episode.episode_number,
          rating: episode.rating,
          image: episode.image
        }));
      })
    );
  }

  getEpisodeByID(id: number): Observable<Episode> {
    return this.webReqService.get(`episodes/id/${id}`).pipe(
      map((response: any) => ({
        id: response.id,
        title: response.title,
        season: response.season,
        episode_number: response.episode_number,
        rating: response.rating,
        image: response.image
      }))
    );
  }

  getPieChartData(): Observable<any> {
    return this.webReqService.get("episodes/pie-chart-data");
  }

  getEpisodeByTitle(title: string): Observable<Episode> {
    return this.webReqService.get(`episodes/title/${this.transformString(title)}`).pipe(
      map((response: any) => ({
        id: response.id,
        title: response.title,
        season: response.season,
        episode_number: response.episode_number,
        rating: response.rating,
        image: response.image
      }))
    );
  }

  getEpisodes(): Observable<Episode[]> {
    return this.webReqService.get("episodes").pipe(
      map((response: any) => {
        return response.map((episode: any) => ({
          id: episode.id,
          title: episode.title,
          season: episode.season,
          episode_number: episode.episode_number,
          rating: episode.rating,
          image: episode.image
        }));
      })
    );
  }

  getTotalCount(): Observable<number> {
    return this.webReqService.get("episodes/length").pipe(
      map((response: any) => {
        // Assuming response is a number from the API
        return response;
      })
    );
  }
  

  getEpisodesByPage(page: number, itemsPerPage: number): Observable<Episode[]> {
    return this.webReqService.get(`episodes/page/${page}/${itemsPerPage}`).pipe(
      map((response: any) => {
        return response.map((episode: any) => ({
          id: episode.id,
          title: episode.title,
          season: episode.season,
          episode_number: episode.episode_number,
          rating: episode.rating,
          image: episode.image
        }));
      })
    );
  }

  deleteEpisode(title: string): Observable<void> {
    return this.webReqService.delete(`episodes/title/${title}`).pipe(
      map(() => undefined) // Map the response to undefined
    );
  }

  getLength(): number {
    return this.episodesList.length;
  }

  transformString(input: string): string {
    let transformedString = input.trim();
    transformedString = transformedString.replace(/\s+/g, '-');
    transformedString = transformedString.toLowerCase();
    return transformedString;
  }

  filterBySeason(season?: number): Observable<Episode[]> {
    if (!season || season === undefined) {
      return this.getEpisodes();
    }
    season = Number(season);
    return this.webReqService.get(`episodes/season/${season}`).pipe(
      map((response: any) => {
        return response.map((episode: any) => ({
          id: episode.id,
          title: episode.title,
          season: episode.season,
          episode_number: episode.episode_number,
          rating: episode.rating,
          image: episode.image
        }));
      })
    );
  }

  searchEpisode(episodeToFind?: string): Observable<Episode[]> {
    if (!episodeToFind || episodeToFind === "" || episodeToFind === undefined) {
      return this.getEpisodes();
    }
    return this.webReqService.get(`episodes/search/${episodeToFind}`).pipe(
      map((response: any) => {
        return response.map((episode: any) => ({
          id: episode.id,
          title: episode.title,
          season: episode.season,
          episode_number: episode.episode_number,
          rating: episode.rating,
          image: episode.image
        }));
      })
    );
  }
}
