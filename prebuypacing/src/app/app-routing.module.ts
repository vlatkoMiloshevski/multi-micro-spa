import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from './pages/login/login-form.component';

import { AuthGuard } from './shared/services/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginFormComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
