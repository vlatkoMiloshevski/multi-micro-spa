import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap} from 'rxjs/operators';

import { LOGIN, LOGOUT, AUTH_VERIFY } from './auth.resource';
import { User } from '../models/user.model';
import { SharedStorageService } from './storage.services';
import { TeamUser } from '../models/team-user.model';


@Injectable()
export class AuthService {

  public $user: BehaviorSubject<User>;
  private redirectUrl: string;

  constructor(
    private http: HttpClient,
    private storage: SharedStorageService
  ) {
    this.$user = new BehaviorSubject(this.storage.getUser());
  }

  get user(): Observable<User> {
    return this.$user.asObservable();
  }

  public getRedirectUrl(): string {
    return this.redirectUrl;
  }

  public setRedirectUrl(value: string) {
    this.redirectUrl = value;
  }

  public isAuthenticated(): boolean {
    // get the user
    const user = this.storage.getUser();
    // return a boolean reflecting whether or not the user is existed
    return !!user;
  }

  public verifyUser(): Observable<User> {
    return this.http.get<User>(AUTH_VERIFY)
    .pipe(
      tap((user: User) => {
        this.$user.next(user);
        this.storage.setUser(user);
      })
    );
  }

  public login(teamUser: TeamUser): Observable<User> {
    return this.http.post<User>(LOGIN, { id: teamUser.id }, { observe: 'response' })
      .pipe(
        map(res => res.body)
      );
  }

/*  public login(teamUser: TeamUser): Observable<User> {
    // TODO: make configurable (seems we don't need login on real SSO)
    return this.http.post<User>(TEAMS_LOGIN, { id: teamUser.id }, { observe: 'response' })
      .pipe(
        flatMap(
          (ev: any) => {
            return this.http.get<User>(AUTH_VERIFY, { observe: 'response' });
          }
        ),
        tap(
          (ev: any) => {
            this.userService.saveUser(ev.body);
          }
        ),
        map(res => res.body)
      );
  }*/

  public logout() {
    return this.http.get(LOGOUT, {})
    .pipe(
      tap(() => {
        this.storage.removeUser();
      })
    );
  }
}
