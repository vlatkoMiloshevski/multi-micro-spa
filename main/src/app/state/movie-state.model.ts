import { Movie } from "../models/movie-model";

export interface MovieStateModel {
    movies: Array<Movie>;
}

export const initMovieStateModel: MovieStateModel = {
    movies: []
}