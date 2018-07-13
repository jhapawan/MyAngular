import { RsaService } from './../../shared/helper/rsaservice';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from '../../shared/config';
import { Token } from '../../shared/usertoken';
import { Observable } from 'rxjs';

@Injectable()
export class PublicService {

  private baseApiUrl = appConfig.apiUrl;
  private accessToken: Token;
  constructor(private http: HttpClient, private rsa: RsaService) {
    

  }
  
  getAllBlog(): Observable<any> {
    {
      let url = this.baseApiUrl + "public/getallblog";
      console.log(url);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      return this.http.get(url, httpOptions).map(res => res);
    }
  }


}
