import { Observable } from 'rxjs/Observable';
import { Token } from './../shared/usertoken';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class DataCommunicateService {
  private data = new BehaviorSubject<string>("");
  // currentMessage = this.data.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.data.next(message)
  }
  clearMessage() {
    this.data.next("");
  }
  getMessage(): Observable<any> {
    return this.data.asObservable();
  }
}
