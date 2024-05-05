import { Injectable } from '@angular/core';
import { Episode } from "../models/episode";
import { Observable, map, throwError} from "rxjs";
import { WebRequestService } from './web-request.service';
import { ToastService } from './toast.service';


@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor(private webReqService: WebRequestService) { }

  getEpisodesByRating(rating: number): Observable<Episode[]> {
    return this.webReqService.get(`episodes/rating/${rating}`).pipe(
      map((response: any) => {
        return response as Episode[];
      })
    );
  }

  getEpisodeByID(id: number): Observable<Episode> {
    return this.webReqService.get(`episodes/id/${id}`).pipe(
      map((response: any) => {
        return response as Episode;
      })
    );
  }

  getPieChartData(): Observable<any> {
    return this.webReqService.get("episodes/pie-chart-data");
  }

  getEpisodeByTitle(title: string): Observable<Episode> {
    return this.webReqService.get(`episodes/title/${this.transformString(title)}`).pipe(
      map((response: any) => {
        return response as Episode;
      })
    );
  }

  getEpisodes(): Observable<Episode[]> {
    return this.webReqService.get("episodes").pipe(
      map((response: any) => {
        return response as Episode[];
      })
    );
  }

  getTotalCount(): Observable<number> {
    return this.webReqService.get("episodes/length").pipe(
      map((response: any) => {
        return response as number;
      })
    );
  }
  

  getEpisodesByPage(page: number, itemsPerPage: number): Observable<Episode[]> {
    return this.webReqService.get(`episodes/page/${page}/${itemsPerPage}`).pipe(
      map((response: any) => {
        return response as Episode[];
      })
    );
  }

  filterBySeason(season?: number): Observable<Episode[]> {
    if (!season || season === undefined) {
      return this.getEpisodes();
    }
    season = Number(season);
    return this.webReqService.get(`episodes/season/${season}`).pipe(
      map((response: any) => {
        return response as Episode[];
      })
    );
  }

  searchEpisode(p: number, pageSize:number, episodeToFind?: string): Observable<Episode[]> {
    if (!episodeToFind || episodeToFind === "" || episodeToFind === undefined) {
      return this.getEpisodesByPage(p, pageSize);
    }
    return this.webReqService.get(`episodes/search/${episodeToFind}`).pipe(
      map((response: any) => {
        return response as Episode[];
      })
    );
  }

  addEpisode(title: string, season: number, episode_number: number, rating: number): Observable<Episode> {

    const episodeData = {
      title: title,
      season: season,
      episode_number: episode_number,
      rating: rating
    };
    return this.webReqService.post('episodes', episodeData).pipe(
      map((response: any) => {
        return response as Episode;
      })
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

  

  deleteEpisode(title: string): Observable<void> {
    return this.webReqService.delete(`episodes/title/${title}`).pipe(
      map(() => undefined)
    );
  }

  transformString(input: string): string {
    let transformedString = input.trim();
    transformedString = transformedString.replace(/\s+/g, '-');
    transformedString = transformedString.toLowerCase();
    return transformedString;
  }

}
