import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class OfflineRequestService {

  private requestQueue: any[] = [];
  private isServerOnline: boolean = true;
  private serverStatusChanged = new Subject<boolean>();

  constructor(private webReqService: WebRequestService) {
    setInterval(() => this.checkServerStatus(), 5000);
  }

  private checkServerStatus() {
    this.webReqService.pingServer().subscribe(
      () => {
        if (!this.isServerOnline) {
          this.isServerOnline = true;
          this.serverStatusChanged.next(true);
        }
      },
      () => {
        if (this.isServerOnline) {
          this.isServerOnline = false;
          this.serverStatusChanged.next(false);
        }
      }
    );
  }

  addToQueue(request: any) {
    if (!this.isServerOnline) {
      this.requestQueue.push(request);
      localStorage.setItem('requestQueue', JSON.stringify(this.requestQueue));
    } else {
      this.sendRequest(request);
    }
  }

  sendQueuedRequests() {
    if (this.isServerOnline) {
      const queuedRequests = JSON.parse(localStorage.getItem('requestQueue') || '[]');
      queuedRequests.forEach((request: any) => {
        this.sendRequest(request);
      });
      localStorage.removeItem('requestQueue');
    }
  }

  private sendRequest(request: any) {
    let requestObservable: Observable<any>;
  
    switch (request.method) {
      case 'post':
        requestObservable = this.webReqService.post(request.uri, request.payload);
        break;
      case 'put':
        requestObservable = this.webReqService.put(request.uri, request.payload);
        break;
      case 'delete':
        requestObservable = this.webReqService.delete(request.uri);
        break;
      default:
        throw new Error('Invalid HTTP method');
    }
  
    requestObservable.subscribe(
      () => {},
      () => {
        this.addToQueue(request);
      }
    );
  }

  getServerStatus(): Observable<boolean> {
    return this.serverStatusChanged.asObservable();
  }
}