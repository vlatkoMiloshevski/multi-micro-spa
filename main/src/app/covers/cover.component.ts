import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ErrorService } from '../services/error-handler.service';
import { Cover } from '../models/cover-model';
import { StateModel } from '../state/state.model';
import { Movie } from '../models/movie-model';
import * as coverActions from '../state/cover.actions';
import * as fromMovie from '../state/movie.selector';
import * as fromCover from '../state/cover.selector';
import { ApiService } from '../services/api-service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-covers',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoversComponent implements OnInit, OnChanges, OnDestroy {

  covers: Array<Cover> = [];
  checked: boolean;
  imageWidth: string;
  covers$: Observable<any>;
  moviesSub$: Subscription;
  imageWidthSub$: Subscription;

  constructor(
    private store: Store<StateModel>,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.moviesSub$ = this.store.pipe(select(fromMovie.getMovieListState)).subscribe(
      this.drawCheckedMoviesCovers.bind(this),
      this.errorService.errorHandler.bind(this)
    );

    this.imageWidthSub$ = this.store.pipe(select(fromCover.getShowLargeImages)).subscribe(
      this.handleImagesSize.bind(this),
      this.errorService.errorHandler.bind(this)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onCheckboxModelChange(changeImageSize) {
    this.store.dispatch(new coverActions.HandleToggleLargeImages(changeImageSize))
  }

  drawCheckedMoviesCovers(movieList: Array<Movie>) {
    this.covers = movieList.filter(movie => movie.checked);
  }

  handleImagesSize(showLargeImages: boolean) {
    this.imageWidth = showLargeImages ? "200" : "150";
    this.checked = showLargeImages ? true : false;
  }

  ngOnDestroy() {
    this.moviesSub$.unsubscribe();
    this.imageWidthSub$.unsubscribe();
  }
}
