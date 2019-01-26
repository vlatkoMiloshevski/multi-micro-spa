import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenRequestInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService,
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
    });
    return next.handle(request);
  }
}
