import { Component } from '@angular/core';

@Component({
  selector: 'hmx-table-parent-number-child-date',
  template: `<hmx-table-date-format *ngIf="dateValue !== null" [value]="dateValue"></hmx-table-date-format>
  <span *ngIf="numberValue !== null">{{numberValue}}</span>`
})
export class TableParentNumberChildDateComponent {
  public params: any;
  public dateValue: Date;
  public numberValue: number;

  agInit(params: any): void {
    this.params = params;
    this.dateValue = params.data.dueDate ? null : params.value ? new Date(params.value) : null;
    this.numberValue = params.data.dueDate && params.value !== null ? params.value : null;
  }
}
