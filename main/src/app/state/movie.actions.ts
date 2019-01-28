import { Action } from "@ngrx/store";
import { Movie } from '../models/movie-model';

export enum MovieActionTypes {
    HandleCheckedMovies = '[MOVIE] HANDLE_CHECKED_MOVIES',
    AddNewMovie = '[MOVIE] ADD_NEW_MOVIE',
    LoadSuccess = "[MOVIE] LOAD_SUCCESS",
    Load = "[MOVIE] LOAD",
    LoadFail = "[MOVIE] LOAD_FAIL",
    AddMovieSuccess = "[MOVIE] ADD_MOVIE_SUCCESS",
    AddMovie = "[MOVIE] ADD_MOVIE",
    AddMovieFail = "[MOVIE] ADD_MOVIE_FAIL"
}

export class HandleCheckedMovies implements Action {
    readonly type = MovieActionTypes.HandleCheckedMovies;

    constructor(public payload: Array<Movie>) { }
}

export class Load implements Action {
    readonly type = MovieActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = MovieActionTypes.LoadSuccess;

    constructor(public payload: any) { }
}

export class LoadFail implements Action {
    readonly type = MovieActionTypes.LoadFail;

    constructor(public payload: any) { }
}

export class AddMovie implements Action {
    readonly type = MovieActionTypes.AddMovie;

    constructor(public payload: any) { }
}

export class AddMovieSuccess implements Action {
    readonly type = MovieActionTypes.AddMovieSuccess;

    constructor(public payload: any) { }
}

export class AddMovieFail implements Action {
    readonly type = MovieActionTypes.AddMovieFail;

    constructor(public payload: any) { }
}

export type MovieActions =
    HandleCheckedMovies |
    LoadSuccess |
    LoadFail |
    Load |
    AddMovie |
    AddMovieSuccess |
    AddMovieFail;