import { Component, forwardRef, Inject, OnDestroy, OnInit } from '@angular/core';
import * as angularImg from "../assets/angular-logo.png";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { IAppState, CounterActions } from './store';
import { Globals } from './spa-intra-communicator';

@Component({
    selector: 'ng6',
    templateUrl: './ng6.component.html',
    styleUrls: ['./style.css']
})
export class Ng6 implements OnInit, OnDestroy {
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
        
    }

    helloFromTheOtherSide() {
       // change the state just in the SPA scope
       this.ngRedux.dispatch(this.actions.helloFromTheOtherSide());
       // change the state on INTRA level
       this.globals.globalEventDistributor.dispatch(this.actions.helloFromTheOtherSide());
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe();
    }

}
