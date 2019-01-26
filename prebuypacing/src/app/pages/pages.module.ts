import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    // angular specific
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    // angular specific
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // app specific
    SharedModule,
    DashboardModule,
    LoginModule
  ],
  declarations: []
})
export class PagesModule {
}
