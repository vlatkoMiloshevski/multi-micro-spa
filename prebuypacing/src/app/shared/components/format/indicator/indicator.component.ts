import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hmx-format-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormatIndicatorComponent implements OnInit {
  @Input() value: any;
  public allAnsweredItems: boolean;
  public hasUnrespondedItems: boolean;

  ngOnInit(): void {
    this.allAnsweredItems = this.value === 0;
    this.hasUnrespondedItems = this.value > 0;
  }
}
