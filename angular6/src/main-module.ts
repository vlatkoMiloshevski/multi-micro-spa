import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Approot } from './app.component';
import { Nested } from './nested.component';
import { enableProdMode } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http'

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
	providers: [{ provide: APP_BASE_HREF, useValue: '/angular6/' }],
	declarations: [
		Approot,
		Nested
	],
	bootstrap: [Approot]
})
export class MainModule {
	constructor() {
	}
}
