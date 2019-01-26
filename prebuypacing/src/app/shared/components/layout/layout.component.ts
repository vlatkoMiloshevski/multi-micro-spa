import {Component, OnInit} from '@angular/core';

import { environment } from '../../../../environments/environment';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../services/auth-guard.service';

@Component({
  selector: 'hmx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public user: User;
  public renderHeader = environment.renderHeader;

  constructor (private authService: AuthService,
               private authGuard: AuthGuard) {
  }

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.authGuard.goToLogin();
    });
  }
}
