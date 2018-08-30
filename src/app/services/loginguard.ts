import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private route: Router) {}

  canActivate() {
    let Token = localStorage.getItem('keyPassControl') || '';

    if (Token != '')
      return true;

    this.route.navigate(['/login']);
    return false;
  }

  canActivateChild() {
    let Token = localStorage.getItem('keyPassControl') || '';

    if (Token != '')
      return true;

    this.route.navigate(['/login']);
    return false;
  }
}
