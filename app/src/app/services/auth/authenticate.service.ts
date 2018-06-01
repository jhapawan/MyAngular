import { Token } from './../../shared/usertoken';
import { appConfig } from './../../shared/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map"
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthenticateService {
  private baseApiUrl = appConfig.apiUrl;
  private accessToken: Token;
  constructor(private http: HttpClient) { }

  doRegistration(formData: any): Observable<any> {
    {
      let url = this.baseApiUrl + "register";
      let headers = new Headers({ 'Content-Type': 'application/json' });
      // headers.append('x-access-token', this.accessToken.access_token);      
      return this.http.post(url, formData, httpOptions).map(res => res);
    }
  }
}
