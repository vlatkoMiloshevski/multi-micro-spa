import { MovieStateModel, initMovieStateModel } from "./movie-state.model";
import { MovieActions, MovieActionTypes } from './movie.actions';

export function moviesReducer(state: MovieStateModel = initMovieStateModel, action: MovieActions): MovieStateModel {
    switch (action.type) {
        case MovieActionTypes.HandleCheckedMovies:
            return {
                ...state,
                movies: [...action.payload]
            }
        case MovieActionTypes.LoadSuccess:
            return {
                ...state,
                movies: [...action.payload]
            }
        case MovieActionTypes.AddMovieSuccess:
            return {
                ...state,
                movies: [...state.movies, action.payload]
            }
        default:
            return state;
    }
}
