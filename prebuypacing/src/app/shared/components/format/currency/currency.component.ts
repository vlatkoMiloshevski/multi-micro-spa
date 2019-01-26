import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hmx-format-currency',
  template: `<span>{{value | currency:currencySign:'symbol':'1.0'}}</span>`,
})
export class FormatCurrencyComponent {
  @Input() value: number;
  @Input() public currencySign: string;
}
