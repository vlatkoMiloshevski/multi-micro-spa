///<reference path="components/prebuy-pacing/components/cell-renderers/table-currency/table-currency.component.ts"/>
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

import { SharedModule } from '../../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { PrebuyPacingComponent } from './components/prebuy-pacing/prebuy-pacing.component';
import { PrebuyPacingService } from './services/prebuy-pacing.service';
import { TableDateComponent } from './components/prebuy-pacing/components/cell-renderers/table-date/table-date.component';
import { TableGoalsComponent } from './components/prebuy-pacing/components/cell-renderers/table-goals/table-goals.component';
import { TableGoalsLegendComponent } from './components/prebuy-pacing/components/table-goals-legend/table-goals-legend.component';
import { TableParentNumberChildDateComponent } from './components/prebuy-pacing/components/cell-renderers/table-parent-number-child-date.component';
import { TableBudgetCellComponent } from './components/prebuy-pacing/components/cell-renderers/table-budget-cell.component';
import { TooltipCellComponent } from './components/prebuy-pacing/components/cell-renderers/tooltip-cell/tooltip-cell.component';
import { TableColumnsFilterComponent } from './components/prebuy-pacing/components/table-columns-filter/table-columns-filter.component';
import { TableFormatDateComponent } from './components/prebuy-pacing/components/cell-renderers/date-format/date-format.component';
import { ToggleGoalsService } from './components/prebuy-pacing/services/toggle-goals.service';
import { TableFormatCurrencyComponent } from './components/prebuy-pacing/components/cell-renderers/table-currency/table-currency.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TableBudgetCellComponent,
    PrebuyPacingComponent,
    TableParentNumberChildDateComponent,
    TableGoalsComponent,
    TableGoalsLegendComponent,
    TableDateComponent,
    TooltipCellComponent,
    TableColumnsFilterComponent,
    TableFormatDateComponent,
    TableFormatCurrencyComponent
  ],
  entryComponents: [],
  imports: [
    AgGridModule.withComponents(
      [
        TableDateComponent,
        TableGoalsComponent,
        TableGoalsLegendComponent,
        TableParentNumberChildDateComponent,
        TableBudgetCellComponent,
        TooltipCellComponent,
        TableColumnsFilterComponent,
        TableFormatCurrencyComponent
      ]
    ),
    // app specific
    SharedModule
  ],
  providers: [
    PrebuyPacingService,
    ToggleGoalsService
  ]
})
export class DashboardModule {
}
