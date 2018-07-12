import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from './../../shared/config';
import { Injectable } from '@angular/core';
import { Token } from '../../shared/usertoken';
import { RsaService } from '../../shared/helper/rsaservice';
import { Observable } from 'rxjs';

@Injectable()
export class BlogService {
  private baseApiUrl = appConfig.apiUrl;
  private accessToken: Token;
  constructor(private http: HttpClient, private rsa: RsaService) {
    this.accessToken = JSON.parse(this.rsa.decrypt(localStorage.getItem("session")));

  }
  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('x-access-token', this.accessToken.access_token);
  }
  getUserById(id: string): Observable<any> {
    {
      let url = this.baseApiUrl + "user/finduserbyid?gid=" + id;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': this.accessToken.access_token
        })
      };
      return this.http.get(url, httpOptions).map(res => res);
    }
  }
  addBlogPost(formData: any): Observable<any> {
    {
      let url = this.baseApiUrl + "blog/saveblogpost";
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': this.accessToken.access_token
        })
      };
      let headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post(url, formData, httpOptions).map(res => res);
    }
  }

}
