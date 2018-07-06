import { RsaService } from './../../shared/helper/rsaservice';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from './../../shared/usertoken';
import { appConfig } from './../../shared/config';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  private baseApiUrl = appConfig.apiUrl;
  private accessToken: Token;
  constructor(private http: HttpClient, private rsa: RsaService) {
    this.accessToken = JSON.parse(this.rsa.decrypt(localStorage.getItem("session")));

  }
  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('x-access-token', this.accessToken.access_token);
  }
  getCountries(): Observable<any> {
    let url = this.baseApiUrl + "common/getcounties";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.accessToken.access_token
      })
    };
    console.log(httpOptions.headers);
    return this.http.get(url, httpOptions).map(res => res);
  }
  getStates(countryName: string): Observable<any> {
    let url = this.baseApiUrl + "common/getstates?countryname=" + countryName;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.accessToken.access_token
      })
    };
    console.log(httpOptions.headers);
    return this.http.get(url, httpOptions).map(res => res);
  }


}
