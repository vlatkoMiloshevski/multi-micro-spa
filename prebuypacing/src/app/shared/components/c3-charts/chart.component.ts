import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import * as c3 from 'c3';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'hmx-chart',
  template: '',
  encapsulation: ViewEncapsulation.None,
  styles: ['.hmx-chart-c3 { display:block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnChanges, OnDestroy, OnInit {

  // All Inputs for this component declaration
  @Input() data: c3.Data;
  // Configuration for series to be used for generating C3 has to be here
  @Input() options: c3.ChartConfiguration;
  @Input() legend: any;

  @Output() chartGenerated: EventEmitter<{ component: ChartComponent, chart: c3.ChartAPI }> = new EventEmitter();
  @Output() chartComponentDestroy: EventEmitter<ChartComponent> = new EventEmitter();

  // Element to which the chart has to be attached to
  private element: HTMLElement;
  private chart: c3.ChartAPI;
  private unsubscribe: Subject<void> = new Subject();

  constructor(elementReference: ElementRef) {
    this.element = elementReference.nativeElement;
    // Adding the below line to specify CSS for the hmx-chart selector
    this.element.className += ' hmx-chart-c3';
  }

  private static isValid(randomInput: any): boolean {
    return randomInput !== undefined && randomInput !== null;
  }

  ngOnChanges() {
    try {
      this.render();
    } catch (err) {
      console.error(err);
    }
  }

  ngOnInit() {
    fromEvent(window, 'focus')
      .pipe(
        debounceTime(500),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => {
        if (this.chart) {
          this.chart.flush();
        }
      });
  }

  ngOnDestroy() {
    this.chartComponentDestroy.emit(this);
    this.unsubscribe.next();
    this.unsubscribe.complete();

    if (this.chart) {
      this.chart.destroy();
    }
  }

  private render(): void {
    if (!ChartComponent.isValid(this.data)) { return; }
    const config: c3.ChartConfiguration = Object.assign({ bindto: this.element, data: this.data, }, this.options);

    // Generates the C3 chart for the given configuration and places it inside
    // the directive's element.
    this.chart = c3.generate(config);
    this.chartGenerated.emit({
      component: this,
      chart: this.chart
    });
    if (this.legend) {
      this.legend(this.chart);
    }
  }
}
