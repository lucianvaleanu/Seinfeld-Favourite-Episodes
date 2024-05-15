import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError, of, timer } from "rxjs";
import { catchError } from "rxjs/operators";
import { OfflineRequestService } from './offline-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private offlineRequestService: OfflineRequestService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    let clonedRequest = req;

    if (token) {
      clonedRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token),
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) { 
          console.log('INTERCEPTOR: Server is down.'); // Log server down message
          this.offlineRequestService.queueRequest(clonedRequest);
          return of(new HttpResponse({ status: 202, statusText: 'Accepted for retry' }));
        }
        return throwError(error);
      })
    );
  }
}
