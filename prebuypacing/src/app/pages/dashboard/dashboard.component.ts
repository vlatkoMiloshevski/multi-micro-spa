import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {Page} from '../../shared/models/page.model';
import {PrebuyPacingItem} from './models/prebuy-pacing-item.model';
import {PrebuyPacingService} from "./services/prebuy-pacing.service";
import {MediaObserver} from "@angular/flex-layout";

@Component({
  selector: 'hmx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public cols: number | string;
  public prebuyPacingLoad: () => Observable<Page<PrebuyPacingItem>>;
  public subscriptions: Subscription = new Subscription();
  public cols_map = new Map([
    ['xs', 6],
    ['sm', 6],
    ['md', 12],
    ['lg', 18],
    ['xl', 18]
  ]);

  constructor(
    private prebuyPacingService: PrebuyPacingService,
    private mediaObserver: MediaObserver,
    ) {

  }

  ngOnInit() {
    this.prebuyPacingLoad = () => this.prebuyPacingService.getPrebuyPacing();
    this.cols = 18;
    this.subscriptions.add(this.mediaObserver.media$.subscribe((mediaChange) => {
      this.cols = this.cols_map.get(mediaChange.mqAlias);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  overFill(cols) {
    return this.cols >= cols ? cols : this.cols;
  }

}
