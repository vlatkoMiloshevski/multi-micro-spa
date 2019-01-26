import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { SharedStorageService } from './storage.services';


@Injectable()
export class AuthGuard implements CanActivate {

  private loginUrl = environment.loginUrl;

  constructor(
    private authService: AuthService,
    private storage: SharedStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(route);
  }

  checkLogin(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      const expectedAdminRole = route.data.expectedAdminRole;
      const superAdminRole = this.storage.getUser().superUser;
      if (
        expectedAdminRole && !superAdminRole
      ) {
        this.authService.logout().subscribe(() => {
          this.goToLogin();
        });
        return false;
      }
      return true;
    }

    return this.authService.verifyUser()
      .pipe(
        map(user => {
          // Store the attempted URL for redirecting
          this.authService.setRedirectUrl(route.url.toString());
          return !!user;
        }),
        catchError(error => of(error))
      );
  }

  public goToLogin(): void {
    // this.router.navigate([this.loginUrl]);
    window.location.href = this.loginUrl;
  }
}
