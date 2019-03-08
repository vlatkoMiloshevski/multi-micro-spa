import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App6 } from './app6.component';
import { enableProdMode } from '@angular/core';
import { APP_BASE_HREF } from "@angular/common";
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { Globals } from './spa-intra-communicator';
import { IAppState, CounterActions } from './store';
import { MainRoutingModule } from './main.routing.module';
import { InterceptService } from './intercept.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageServiceModule } from 'angular-webstorage-service';

enableProdMode();

@NgModule({
	imports: [
		HttpClientModule,
		BrowserModule,
		NgReduxModule,
		MainRoutingModule,
		StorageServiceModule
	],
	providers: [
		{ provide: APP_BASE_HREF, useValue: '/app6/' },
		CounterActions,
		Globals,
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		}
	],
	declarations: [
		App6
	],
	bootstrap: [App6]
})
export class MainModule {
	constructor(
		private ngRedux: NgRedux<IAppState>,
		private globals: Globals,
		@Inject('localStoreRef') private localStoreRef: any,
		@Inject('globalEventDispatcherRef') private globalEventDistributorRef: any
	) {
		this.ngRedux.provideStore(this.localStoreRef);
		this.globals.globalEventDistributor = this.globalEventDistributorRef;
	}
}
