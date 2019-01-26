import { Component } from '@angular/core';

@Component({
  selector: 'hmx-table-currency',
  template: `<hmx-format-currency [value]="params.value" [currencySign]="params.currencySign"></hmx-format-currency>`,
})
export class TableCurrencyComponent {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }
}
