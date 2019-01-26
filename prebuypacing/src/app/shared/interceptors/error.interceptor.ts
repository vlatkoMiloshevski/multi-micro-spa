import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public authGuard: AuthGuard, public authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
            catchError(err => {
                if (err.status === 401 || err.status === 403) {
                    // auto logout if 401 response returned from api
                    // need to redirect to login form
                  if (request.url.indexOf('logout') !== -1) {
                    // Dirty hack because of cloudfront protection that returns 401 for logout
                    this.authGuard.goToLogin();
                    return throwError(err);
                  }
                  this.authService.logout()
                    .subscribe(() => this.authGuard.goToLogin());
                }
                return throwError(err);
            }
        ));
    }
}
