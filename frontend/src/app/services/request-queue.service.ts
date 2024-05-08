import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestQueueService {
  private queue: any[] = [];

  constructor() {}

  enqueue(request: any) {
    console.log("This is the queue: " + this.queue);
    this.queue.push(request);
  }

  dequeue(): any | undefined {
    console.log("This is the queue: " + this.queue);

    return this.queue.shift();
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }
}
