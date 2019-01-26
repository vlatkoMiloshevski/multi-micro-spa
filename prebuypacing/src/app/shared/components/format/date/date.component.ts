import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hmx-date-format',
  template: `<span class="hmx-date">
    <span>{{dateValue | date:dateFormat}}</span>
    <i class="material-icons">date_range</i>
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
export class FormatDateComponent implements OnInit {
  @Input() value;
  public dateValue: Date;
  public dateFormat: string;

  ngOnInit(): void {
    this.dateValue = new Date(this.value);
    this.dateFormat = 'MM/dd/y';
  }
}
