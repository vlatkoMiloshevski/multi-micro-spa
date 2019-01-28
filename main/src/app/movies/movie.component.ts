import { Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { Movie } from '../models/movie-model';
import { Store, select } from '@ngrx/store';
import { ErrorService } from '../services/error-handler.service';
import { StateModel } from '../state/state.model';
import * as movieActions from '../state/movie.actions';
import * as fromMovie from '../state/movie.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MoviesComponent implements OnInit, OnChanges, OnDestroy {
  movies: Array<Movie> = [];
  moviesSub$: Subscription;

  constructor(
    private store: Store<StateModel>,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.moviesSub$ = this.store.pipe(select(fromMovie.getMovieListState)).subscribe(
      this.handleMoviesCheckedState.bind(this),
      this.errorService.errorHandler.bind(this)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  changeCheckedValue(movie: Movie) {
    this.store.dispatch(new movieActions.HandleCheckedMovies(this.movies));
  }

  addNewMovie(movieTitle, movieUrl) {
    let movie: Movie = new Movie(this.movies.length, movieTitle, true, movieUrl);
    this.store.dispatch(new movieActions.AddMovie(movie));
  }

  // handle movies state
  handleMoviesCheckedState(movieList: Array<Movie>) {
    this.movies = movieList;
  }

  ngOnDestroy() {
    this.moviesSub$.unsubscribe();
  }
}
