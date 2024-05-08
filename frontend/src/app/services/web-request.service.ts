import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { OfflineRequestService } from './offline-request.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient,
    private offlineRequestService: OfflineRequestService
  ) { 
    this.ROOT_URL = 'http://localhost:8080';
  }

  get(uri:string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri:string, payload:Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  put(uri:string, payload:Object){
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri:string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  pingServer(): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/ping`);
  }

  private handleRequest(method: string, uri: string, payload?: Object): Observable<any> {
    if (!navigator.onLine) {
      this.offlineRequestService.addToQueue({ uri, method, payload });
      return new Observable(observer => {
        observer.error('Offline');
      });
    } else {
      let requestObservable: Observable<any>;

      switch (method) {
        case 'post':
          requestObservable = this.http.post(`${this.ROOT_URL}/${uri}`, payload);
          break;
        case 'put':
          requestObservable = this.http.put(`${this.ROOT_URL}/${uri}`, payload);
          break;
        case 'delete':
          requestObservable = this.http.delete(`${this.ROOT_URL}/${uri}`);
          break;
        default:
          throw new Error('Invalid HTTP method');
      }

      return requestObservable.pipe(
        catchError(error => {
          return throwError(error);
        })
      );
    }
  }

}
