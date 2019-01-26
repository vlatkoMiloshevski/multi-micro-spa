import { NgModule } from '@angular/core';

import { LoginFormComponent } from './login-form.component';

import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginFormComponent
  ],
})
export class LoginModule {}
