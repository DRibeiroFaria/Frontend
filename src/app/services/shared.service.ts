import { Injectable } from '@angular/core';
import { nextTick } from 'process';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private subjectName = new Subject<any>(); //need to create a subject
    
        sendUpdate(message : string) { //the component that wants to update something, calls this fn
            this.subjectName.next(message); //next() will feed the value in Subject
        }
    
        getUpdate(): Observable<any> { //the receiver component calls this function 
            return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
        }
}
