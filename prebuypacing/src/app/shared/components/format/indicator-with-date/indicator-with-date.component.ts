import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hmx-format-indicator-with-date',
  templateUrl: './indicator-with-date.component.html',
  styleUrls: ['./indicator-with-date.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormatIndicatorWithDateComponent implements OnInit {
  @Input() value: any;
  public allAnsweredItems: boolean;
  public hasUnrespondedItems: boolean;
  public tooltipDate: Date;
  public dateFormat: string;

  ngOnInit(): void {
    this.allAnsweredItems = this.value.value === 0;
    this.hasUnrespondedItems = this.value.value > 0;
    this.tooltipDate = this.value.date ? new Date(this.value.date) : null;
    this.dateFormat = 'MM/dd/y';
  }
}
