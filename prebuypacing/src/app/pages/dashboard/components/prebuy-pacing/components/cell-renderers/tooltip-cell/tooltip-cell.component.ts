import { Component } from '@angular/core';

@Component({
  selector: 'hmx-tooltip-cell',
  template: `
    <span matTooltip="{{tooltipValue}}">{{value}}</span>
  `,
  styles: [`
    :host {
      display: flex;
    }
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `]
})
export class TooltipCellComponent {
  public value: any;
  public tooltipValue: any;

  agInit(params: any) {
    this.value = params.value.text ? params.value.text : params.value;
    this.tooltipValue = params.value.tooltipText ? params.value.tooltipText : params.value;
  }
}
