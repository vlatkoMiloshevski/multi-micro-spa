import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Team } from '../../shared/models/team.model';
import { TeamUser } from '../../shared/models/team-user.model';
import { User } from '../../shared/models/user.model';

import { TeamService } from '../../shared/services/team.service';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'hmx-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit {

  public teamsList: Team[] = [];
  public teamUsersList: TeamUser[];
  public loginForm;

  constructor(private router: Router,
    private teamService: TeamService,
    private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      team: [null, Validators.required],
      user: [null, Validators.required]
    });
    this.teamService.getTeams()
    .subscribe(
      (data: Team[]) => {
        this.teamsList = data;
      }
    );
  }

  updateUserList(e): void {
    this.teamService.getTeamUsers(e.value)
    .subscribe(
      (data: TeamUser[]) => {
        this.teamUsersList = data;
      }
    );
  }

  login(): void {
    this.authService.login(this.loginForm.value.user)
    .subscribe(
      (data: User) => {
        const redirectUrl = this.authService.getRedirectUrl() || '';
        this.router.navigate([redirectUrl]);
      }
    );
  }
}

