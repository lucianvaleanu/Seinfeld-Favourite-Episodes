import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userID!: number;

  constructor(private webRequestService: WebRequestService) { }

  signup(name: string, email: string, password: string): Observable<User> {
    const user = { name, email, password };
    return this.webRequestService.post('auth/signup', user).pipe(
      tap((response: any) => {
        console.log('Status Code:', response.status);
        console.log('Message:', response.message);
      }),
      map((response: any) => {
        return response as User;
      })
    );
  }

  signin(nameOrEmail: string, password: string): Observable<{
    token: string; userID: number
  }> {
    const userData = { nameOrEmail: nameOrEmail, password: password };
    return this.webRequestService.post('auth/login', userData).pipe(
      map((response: any) => {
        this.userID = response.userID;
        localStorage.setItem("token", response.token);
        this.isUserLoggedIn$.next(true);
        return response as {
          token: string; userID: number
        }
      })
    )
  }

}
