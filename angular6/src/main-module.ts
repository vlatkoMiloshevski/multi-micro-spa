import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Approot } from './app.component';
import { Nested } from './nested.component';
import { enableProdMode } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http'
import { CounterActions, IAppState } from './store';
import { Globals } from './globals.service';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
	{
		path: 'nested',
		component: Nested
	}
];

enableProdMode();

@NgModule({
	imports: [
		BrowserAnimationsModule,
		HttpClientModule,
		BrowserModule,
		RouterModule.forRoot(appRoutes, {
			useHash: true
		}),
		NgReduxModule,
		MaterialModule,
		FormsModule
	],
	providers: [{ provide: APP_BASE_HREF, useValue: '/angular6/' }, CounterActions, Globals],
	declarations: [
		Approot,
		Nested
	],
	bootstrap: [Approot]
})
export class MainModule {
    /*@ngInject*/
	constructor(
		private ngRedux: NgRedux<IAppState>,
		private globals: Globals,
		@Inject('localStoreRef') private localStoreRef: any,
		@Inject('globalEventDispatcherRef') private globalEventDispatcherRef: any
	) {
		this.ngRedux.provideStore(localStoreRef);
		this.globals.globalEventDistributor = globalEventDispatcherRef;
	}
}
