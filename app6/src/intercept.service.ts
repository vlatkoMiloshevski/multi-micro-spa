
import { StorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { Injectable, Inject } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable()//{providedIn: 'root'}

export class InterceptService implements HttpInterceptor {

    constructor(
        @Inject(LOCAL_STORAGE) private localStorage: StorageService
    ) { }

    // intercept request and add token
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("----request----");

        console.log(request);

        console.log("--- end of request---");


        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {

                        console.log(" all looks good");
                        // http response status code
                        console.log(event.status);
                    }
                }, error => {
                    // http response status code
                    console.log("----response----");
                    console.error("status code:");
                    console.error(error.status);
                    if (error.status == 401) {
                        this.localStorage.remove("user");
                        window.location.reload();
                    }
                    console.error(error.message);
                    console.log("--- end of response---");

                })
            )

    };


}