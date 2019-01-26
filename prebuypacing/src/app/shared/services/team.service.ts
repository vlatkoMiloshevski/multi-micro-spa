import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TEAMS, TEAMS_USERS } from './team.resource';
import { Team } from '../models/team.model';
import { TeamUser } from '../models/team-user.model';

@Injectable()
export class TeamService {

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(TEAMS);
  }

  getTeamUsers(id: number): Observable<TeamUser[]> {
    return this.http.get<TeamUser[]>(TEAMS_USERS(id));
  }
}
