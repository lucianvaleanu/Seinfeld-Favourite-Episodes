import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EpisodeService } from '../src/app/services/episode.service';

describe('EpisodeService', () => {
  let service: EpisodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EpisodeService]
    });
    service = TestBed.inject(EpisodeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an episode', () => {
    const testData = { title: 'Episode 1', season: 1, ep: 1, rating: 8.5 };
    service.addEpisode('Episode 1', 1, 1, 8.5).subscribe((response) => {
      expect(response.title).toEqual(testData.title);
      expect(response.season).toEqual(testData.season);
      expect(response.ep).toEqual(testData.ep);
      expect(response.rating).toEqual(testData.rating);
    });
    const req = httpMock.expectOne('http://localhost:8080/episodes');
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

  it('should update an episode', () => {
    const testData = { id: 1, title: 'Updated Episode', season: 2, ep: 3, rating: 9.0 };
    service.updateEpisode(1, testData).subscribe((response) => {
      expect(response).toBeUndefined(); // Assuming map to undefined in service
    });
    const req = httpMock.expectOne('http://localhost:8080/episodes/id/1');
    expect(req.request.method).toEqual('PUT');
    req.flush({});
  });

  // Add more tests covering other methods like getEpisodeByID, getPieChartData, etc.
});
