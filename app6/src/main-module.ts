import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App6 } from './app6.component';
import { Nested } from './nested.component';
import { enableProdMode } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http'
import { Globals } from './spa-intra-communicator';
import { IAppState, CounterActions } from './store';

const appRoutes: Routes = [
	{
		path: 'nested',
		component: Nested
	}
];

enableProdMode();

@NgModule({
	imports: [
		HttpClientModule,
		BrowserModule,
		RouterModule.forRoot(appRoutes, {
			useHash: true
		}),
		NgReduxModule
	],
	providers: [{ provide: APP_BASE_HREF, useValue: '/app6/' }, CounterActions, Globals],
	declarations: [
		App6,
		Nested
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
