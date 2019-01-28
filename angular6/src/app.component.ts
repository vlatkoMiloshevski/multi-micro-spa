import { Component, forwardRef, Inject, OnDestroy, OnInit } from '@angular/core';
import * as angularImg from "../assets/angular-logo.png";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { Globals } from './globals.service';
import { CounterActions, IAppState } from './store';

@Component({
    selector: 'approot',
    templateUrl: './app.component.html',
    styleUrls: ['./style.css']
})
export class Approot implements OnInit, OnDestroy {
    helloMessage: string;
    angularImg: any;
    data: any;
    subscription;
    test;

    constructor(
        @Inject(forwardRef(() => NgRedux)) private ngRedux: NgRedux<IAppState>,
        @Inject(forwardRef(() => CounterActions)) private actions: CounterActions,
        @Inject(forwardRef(() => Globals)) private globals: Globals,
        private $http: HttpClient
    ) {
        this.subscription = this.ngRedux.select<string>('helloMessage')
            .subscribe(helloMessage => this.helloMessage = helloMessage);

        this.angularImg = angularImg;
    }

    ngOnInit() {
        // $http.get('/api/firstSubmission/' + campaignId)
        this.subscription = this.$http.get('api/firstSubmission/6')
            .pipe(tap())
            .subscribe(
                this.bindResponseDataToViewModel.bind(this),
                this.logInfo.bind(this)
            );
    }

    bindResponseDataToViewModel(success) {
        this.data = success;
    }

    sayHello() {
        // change the state just in the SPA scope
        this.ngRedux.dispatch(this.actions.sayHello());
        // change the state on INTRA level
        this.globals.globalEventDistributor.dispatch(this.actions.sayHello());
    }

    logInfo(data) {
        console.log(data);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
