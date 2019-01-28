import { MovieStateModel } from "./movie-state.model";
import { CoverStateModel } from "./cover-state.model";

export interface StateModel {
    movies: MovieStateModel;
    covers: CoverStateModel
}