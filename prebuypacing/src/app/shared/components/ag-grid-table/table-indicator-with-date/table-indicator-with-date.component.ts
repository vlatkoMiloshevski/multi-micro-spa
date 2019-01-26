import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hmx-table-indicator-with-date',
  templateUrl: './table-indicator-with-date.component.html',
  styleUrls: ['./table-indicator-with-date.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableIndicatorWithDateComponent {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }
}
