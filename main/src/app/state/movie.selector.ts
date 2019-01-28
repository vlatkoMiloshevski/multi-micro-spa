import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovieStateModel } from "./movie-state.model";

const getMovieFeatureState = createFeatureSelector<MovieStateModel>('movies');

export const getMovieListState = createSelector(
    getMovieFeatureState,
    state => state.movies
)

