import { DataCommunicateService } from './../data-communicate.service';
import { Token } from './../../shared/usertoken';
import { appConfig } from './../../shared/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map"

@Injectable()
export class UserServiceService {
  private baseApiUrl = appConfig.apiUrl;
  private accessToken: Token;
  constructor(private http: HttpClient, private dataService: DataCommunicateService) {
    this.accessToken = JSON.parse(localStorage.getItem("session"));

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
      console.log(httpOptions.headers);
      return this.http.get(url, httpOptions).map(res => res);
    }
  }
  updateUser(formData: any): Observable<any> {
    {
      let url = this.baseApiUrl + "user/updateuserbyid";
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
  addExeperience(formData: any): Observable<any> {
    {
      let url = this.baseApiUrl + "user/addexeperience";
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
  addEducation(formData: any): Observable<any> {
    {
      let url = this.baseApiUrl + "user/addeducation";
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
  updaetExeperienceEducation(formData: any): Observable<any> {
    {
      let url = this.baseApiUrl + "user/updateprofiledetails";
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
  addSkill(formData: any): Observable<any> {
    {
      let url = this.baseApiUrl + "user/addskill";
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
  updateGallary(data: any): Observable<any> {
    let formdata = new FormData();

    let fieldName;
    Object.keys(data).forEach(x => {
      // console.log(x);
      // console.log(data[x]);
      formdata.append(x, data[x]);
      fieldName = data[x];
    });
    data.galary.forEach(element => {
      formdata.append(fieldName, element.image);
    });
    let url = this.baseApiUrl + "user/updategallary";
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.accessToken.access_token
      })
    };
    // return this.http.post(url, formdata, optionstest).map(res => res.json());
    return this.http.post(url, formdata, httpOptions).map(res => res);
  }

}
