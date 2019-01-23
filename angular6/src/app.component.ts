import { Component, forwardRef, Inject, OnDestroy, OnInit } from '@angular/core';
import * as angularImg from "../assets/angular-logo.png";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'approot',
    templateUrl: './app.component.html',
})
export class Approot implements OnInit, OnDestroy {
    count: number;
    angularImg: any;
    data: any;
    subscription;

    constructor(
        private $http: HttpClient
    ) {
        this.angularImg = angularImg;
    }

    ngOnInit() {
        this.subscription = this.$http.get('api/emailList')
            .pipe(tap())
            .subscribe(
                this.bindResponseDataToViewModel.bind(this),
                this.logInfo.bind(this)
            );
    }

    bindResponseDataToViewModel(success) {
        this.data = success;
    }

    logInfo(data) {
        console.log(data);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
