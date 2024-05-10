import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WebRequestService } from '../src/app/services/web-request.service';

describe('WebRequestService', () => {
  let service: WebRequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WebRequestService]
    });
    service = TestBed.inject(WebRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request', () => {
    const testData = { message: 'Hello' };
    service.get('test').subscribe((response) => {
      expect(response).toEqual(testData);
    });
    const req = httpMock.expectOne('http://localhost:8080/test');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should send a POST request', () => {
    const testData = { name: 'John' };
    service.post('test', testData).subscribe((response) => {
      expect(response).toEqual(testData);
    });
    const req = httpMock.expectOne('http://localhost:8080/test');
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

});
