import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hmx-table-date-format',
  template: `<span class="hmx-date" *ngIf="dateValue">
    <span>{{dateValue | date:dateFormat}}</span>
    <i *ngIf="dateIcon" class="material-icons">date_range</i>
  </span>`,
  styles: [`    
    .hmx-date {
      display: flex;
      min-width: 90px;
    }
    .hmx-date span,
    .hmx-date .material-icons {
      display: inline-block;
      vertical-align: middle;
    }
    .hmx-date .material-icons {
      font-size: 20px;
      color: #2284e3;
      line-height: inherit;
      margin-left: 5px;
    }
  `]
})
export class TableFormatDateComponent implements OnInit {
  @Input() value;
  @Input() dateIcon: boolean;
  public dateValue: Date;
  public dateFormat: string;
  ngOnInit(): void {
    this.dateValue = this.value ? new Date(this.value) : null;
    this.dateFormat = 'MM/dd/y';
  }
}
