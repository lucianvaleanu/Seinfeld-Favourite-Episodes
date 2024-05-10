import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/ping') || req.url.includes('/auth')) {
      return next.handle(req);
  }

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        const clonedRequest = req.clone({
          headers: req.headers.set("Authorization", "Bearer " + token),
        });
        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(error);
          })
        );
      }
    }

    return next.handle(req);
  }
}
