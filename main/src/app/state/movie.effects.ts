import { Injectable } from "@angular/core";
import { Effect, ofType } from "@ngrx/effects";
import * as movieActions from './movie.actions'
import { Actions } from "@ngrx/effects";
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { ApiService } from "../services/api-service";
import { MovieStateModel } from './movie-state.model';
import { of, Observable } from "rxjs";
import { Action } from '@ngrx/store';

@Injectable()
export class MovieEffects {
    first: boolean = true;

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {
    }

    @Effect()
    loadMovies$: Observable<Action> = this.actions$.pipe(
        ofType(movieActions.MovieActionTypes.Load),
        mergeMap((action: movieActions.Load) => this.apiService.getInitMovies().pipe(
            map((movies: Array<MovieStateModel>) => (new movieActions.LoadSuccess(movies))),
            catchError(error => of(new movieActions.LoadFail(error)))
        ))
    )

    @Effect()
    addMovie$: Observable<Action> = this.actions$.pipe(
        ofType(movieActions.MovieActionTypes.AddMovie),
        mergeMap((action: movieActions.AddMovie) => this.apiService.addNewMovie(action.payload).pipe(
            map((movies: Array<MovieStateModel>) => (new movieActions.AddMovieSuccess(movies))),
            catchError(error => of(new movieActions.AddMovieFail(error)))
        ))
    )

} 