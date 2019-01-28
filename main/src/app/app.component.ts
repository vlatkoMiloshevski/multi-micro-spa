import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateModel } from './state/state.model';
import * as movieActions from './state/movie.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(    
    private store: Store<StateModel>,
  ) {    
  }

  ngOnInit() {    
    this.store.dispatch(new movieActions.Load());
  }


}
