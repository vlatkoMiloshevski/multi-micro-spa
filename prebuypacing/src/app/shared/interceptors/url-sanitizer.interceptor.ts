import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class UrlSanitizerInterceptor implements HttpInterceptor {
  private validUrlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}(\.[a-z]{2,6})*\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/i;

  constructor() {}

  private get hostname(): string {
    return window.location.hostname;
  }

  private get rootApiUrl(): string {
    return environment.apiUrl;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.validUrlRegex.test(req.url)) {
      return next.handle(req);
    }
    const endpointUrl = req.url;
    const slash =
      this.rootApiUrl.endsWith('/') || endpointUrl.startsWith('/') ? '' : '/';
    const url = `${this.rootApiUrl}${slash}${endpointUrl}`;
    return next.handle(req.clone({ url: url }));
  }
}
