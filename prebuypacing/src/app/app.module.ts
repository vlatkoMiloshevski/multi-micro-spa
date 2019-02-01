import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PrebuypacingComponent } from './prebuypacing.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { APP_BASE_HREF } from '@angular/common';
// import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    PrebuypacingComponent
  ],
  imports: [
    // angular specific
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // 3rd party
    MaterialModule,
    FlexLayoutModule,
    // app specific
    AppRoutingModule,
    SharedModule,
    PagesModule,
    //    AuthModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/prebuypacing/' }],
  bootstrap: [PrebuypacingComponent]
})
export class AppModule {
  constructor() {
    console.log("PrebuyPacing started");
  }
}
