// services/web-request.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { RequestQueueService } from './request-queue.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly ROOT_URL;
  private isServerOnline: boolean = true;
  private retryInterval: number = 5000; // Adjust as needed

  constructor(private http: HttpClient, private requestQueueService: RequestQueueService) {
    this.ROOT_URL = 'http://localhost:8080';
    this.checkServerStatus();
  }

  get(uri: string): Observable<any> {
    return this.sendRequest('GET', uri);
  }

  post(uri: string, payload: Object): Observable<any> {
    return this.sendRequest('POST', uri, payload);
  }

  put(uri: string, payload: Object): Observable<any> {
    return this.sendRequest('PUT', uri, payload);
  }

  delete(uri: string): Observable<any> {
    return this.sendRequest('DELETE', uri);
  }

  private sendRequest(method: string, uri: string, payload?: Object): Observable<any> {
    console.log("The server online status is " + this.isServerOnline);
    if (this.isServerOnline) {
      let request;
      switch (method) {
        case 'GET':
          request = this.http.get(`${this.ROOT_URL}/${uri}`);
          break;
        case 'POST':
          request = this.http.post(`${this.ROOT_URL}/${uri}`, payload);
          break;
        case 'PUT':
          request = this.http.put(`${this.ROOT_URL}/${uri}`, payload);
          break;
        case 'DELETE':
          request = this.http.delete(`${this.ROOT_URL}/${uri}`);
          break;
        default:
          throw new Error('Invalid HTTP method');
      }
      return request.pipe(
        catchError(error => {
          this.isServerOnline = false;
          this.requestQueueService.enqueue({ method, uri, payload });
          return throwError(error);
        })
      );
    } else {
      this.requestQueueService.enqueue({ method, uri, payload });
      return of(null); // Return an observable immediately
    }
  }

  private checkServerStatus(): void {
    timer(0, this.retryInterval).pipe(
      switchMap(() => this.http.get(this.ROOT_URL).pipe(
        catchError(() => of(null)) // Catch error if server is unreachable
      ))
    ).subscribe(() => {
      this.isServerOnline = true;
      this.processQueue();
    });
  }

  private processQueue(): void {
    while (!this.requestQueueService.isEmpty() && this.isServerOnline) {
      const request = this.requestQueueService.dequeue();
      if (request) {
        this.sendRequest(request.method, request.uri, request.payload).subscribe();
      }
    }
  }
}
