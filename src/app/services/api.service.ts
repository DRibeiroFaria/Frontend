import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, first, tap } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';

const HOST = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient, 
    private errorHandlerService: ErrorHandlerService,
    private notifyService: NotificationService) 
    {}

  postUrl(data : any){
    return this.http.post<any>(HOST + "api/url",data)
  }

  getAllUrl(){
    return this.http.get<any>(HOST + "api/url")
  }

  putUrl(id : number, url_code : string){
     const data = { url_code: url_code}
      return this.http.put<any>(HOST + `/api/url/${id}`, data).pipe(
      first(),
      tap(()=>{
          this.notifyService.showSuccess("","Success");
      }),
      catchError(this.errorHandlerService.handleErrorUrl<any>("put")))
  }

}
