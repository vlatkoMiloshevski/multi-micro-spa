import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hmx-table-indicator',
  templateUrl: './table-indicator.component.html',
  styleUrls: ['./table-indicator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableIndicatorComponent {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }
}
