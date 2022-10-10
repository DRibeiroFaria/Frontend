import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService {
  constructor(private notifyService: NotificationService) { }

  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.notifyService.showError("",error.error.error)
      return of(result as T);
    };
  }

  handleErrorEmail<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.notifyService.showError("",error.error.email.message)
      return of(result as T);
    };
  }

  handleErrorUrl<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log(error.error)
      this.notifyService.showError("",error.error.url_code.message)
      return of(result as T);
    };
  }
}