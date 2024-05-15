import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class OfflineRequestService {
  private requestQueue: HttpRequest<any>[] = [];
  private isServerDown = false;

  constructor(private http: HttpClient) {
    this.startServerStatusCheck();
  }

  queueRequest(request: HttpRequest<any>): void {
    console.log('Server down, queuing request:', request);
    this.requestQueue.push(request);
    console.log(this.requestQueue.length + " requests so far...");
  }

  private retryRequests(): void {
    console.log('Starting to retry queued requests...');
    this.requestQueue.forEach(req => this.sendRequest(req)); 
  }

  private sendRequest(request: HttpRequest<any>): void {
    this.http.request(request).subscribe(
      () => {
        console.log('Successfully retried request:', request);
        this.requestQueue = this.requestQueue.filter(req => req !== request);
      },
      () => {
        console.log('Retrying request:', request);
      }
    );
  }

  private startServerStatusCheck(): void {
    console.log("Server check started");

    setInterval(async () => {
      try {
          const response = await axios.get('http://localhost:8080/ping');
          if(response.status === 200 && this.isServerDown){
            console.log('Server is back up. Retrying queued requests...');
            this.isServerDown = false;
            this.retryRequests();
          }
          else if(response.status === 200 && !this.isServerDown) {
            this.isServerDown = true;
          }
      } catch (error) {
          console.log(error);
      }
  }, 5000);
  }
}
