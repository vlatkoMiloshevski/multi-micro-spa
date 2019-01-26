import { Component } from '@angular/core';

@Component({
  selector: 'hmx-table-date',
  template: `<hmx-table-date-format *ngIf="dateExist" [dateIcon]="true" [value]="dateValue"></hmx-table-date-format>`
})
export class TableDateComponent {
  public params: any;
  public dateValue: Date;
  public dateExist: boolean;

  agInit(params: any): void {
    this.params = params;
    this.dateValue = params.value ? new Date(params.value) : null;
    this.dateExist = params.value ? true : false;
  }
}
