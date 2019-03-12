import { Component, forwardRef, Inject, OnDestroy, OnInit } from '@angular/core';
import * as angularImg from "./assets/angular-logo.png";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { IAppState, CounterActions } from './store';
import { Globals } from './spa-intra-communicator';
import './assets/scss/app.scss'
import './assets/less/app.less'
import './assets/css/app.css'

//app component
@Component({
    selector: 'app6',
    templateUrl: './app6.component.html'
})
export class App6 implements OnInit, OnDestroy {
    angularImg: any;
    data: any;
    subscription;
    storeSubscription: any;
    regards: string;
    helloMessage: string;

    constructor(
        private $http: HttpClient,
        @Inject(forwardRef(() => NgRedux)) private ngRedux: NgRedux<IAppState>,
        @Inject(forwardRef(() => CounterActions)) private actions: CounterActions,
        @Inject(forwardRef(() => Globals)) private globals: Globals
    ) {
        this.angularImg = angularImg;
        this.storeSubscription = this.ngRedux.select<string>('helloMessage')
            .subscribe(helloMessage => this.helloMessage = helloMessage);
    }

    ngOnInit() {
        console.log("app6 component onInit");
    }

    testButton() {
        this.$http.get('/api/me')
            .subscribe(
                success => console.log(success),
                error => console.log(error.message)
            );
    }


    sayHello() {
        // change the state just in the SPA scope
        this.ngRedux.dispatch(this.actions.sayHello());
        // change the state on INTRA level
        this.globals.globalEventDistributor.dispatch(this.actions.sayHello());
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe();
    }

}
