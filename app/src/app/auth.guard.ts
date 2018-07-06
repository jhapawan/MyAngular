import { RsaService } from './shared/helper/rsaservice';
import { Token } from './shared/usertoken';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private rsa: RsaService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    let userSession: Token = JSON.parse(this.rsa.decrypt(localStorage.getItem("session")));
    if (userSession) {
      return true;
    } else {
      console.log("asdfsd");
      window.alert("You don't have permission to view this page");
      return false;
    }
  }
}
