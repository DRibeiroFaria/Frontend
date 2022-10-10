import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";

import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";
import { NotificationService } from './notification.service';
import { environment } from "src/environments/environment";
import { MatDialogRef } from "@angular/material/dialog";
import { SingupComponent } from "../components/singup/singup.component";
import { SigninComponent } from "../components/signin/signin.component";

const HOST = environment.url

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, 
    private errorHandlerService: ErrorHandlerService, 
    private router: Router, 
    private notifyService: NotificationService) { }

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId!: string;
  
  httpOptions : { headers : HttpHeaders} = {
    headers : new HttpHeaders({ "Content-Type": "application/json"})
  }

  signup(user: Omit<User, "id">): Observable<User>{
    return this.http.post<User>(HOST + "api/user/signup",user, this.httpOptions).pipe(
      first(),
      tap(()=>{
          this.notifyService.showSuccess('Please Sign in','Success');
      }),
      catchError((this.errorHandlerService.handleErrorEmail<User>("signup"))))
  }

  signin(email: Pick<User, 'email'>,
    pass: Pick<User, 'pass'>
  ): Observable<{
    token: string;
    userId: string;
  }> {
    return this.http
      .post<{
        token: string;
        userId: string;
      }>(HOST + `api/user/login`, { email, pass } , this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userId: string }) => {
          this.notifyService.showSuccess('','Success');
          this.userId = tokenObject.userId;
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["home"]);        
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: string;
          }>("login")
        )
      );
  }
}
