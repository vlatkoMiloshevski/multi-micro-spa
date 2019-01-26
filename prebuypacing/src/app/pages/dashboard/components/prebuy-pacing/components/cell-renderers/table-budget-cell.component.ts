import { Component } from '@angular/core';

@Component({
  selector: 'hmx-table-budget-cell',
  template: `<span matTooltip="{{tooltip| currency:params.currencySign:'symbol':'1.0'}}">
    <hmx-table-format-currency *ngIf="!dueDateValue && budgetValue !== null" [value]="budgetValue" [currencySign]="params.currencySign"></hmx-table-format-currency>
    <span *ngIf="dueDateValue && budgetValue !== null">{{budgetValue}}%</span>
  </span>`
})
export class TableBudgetCellComponent {
  public params: any;
  public budgetValue: string;
  public dueDateValue: string;
  public tooltip: string;

  agInit(params: any): void {
    this.params = params;
    this.budgetValue = params.data.budget;
    this.dueDateValue = params.data.dueDate;
    this.tooltip = params.data.children ? params.data.children.reduce((acc, i) => acc + i.budget, 0) : params.data.budget;
  }
}
