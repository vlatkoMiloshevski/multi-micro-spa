import { GridOptions } from 'ag-grid-community';

import { TableDateComponent } from './components/cell-renderers/table-date/table-date.component';
import { TooltipCellComponent } from './components/cell-renderers/tooltip-cell/tooltip-cell.component';
import { TableGoalsComponent } from './components/cell-renderers/table-goals/table-goals.component';
import { TableParentNumberChildDateComponent } from './components/cell-renderers/table-parent-number-child-date.component';
import { TableBudgetCellComponent } from './components/cell-renderers/table-budget-cell.component';
import { ComparatorHelper } from '../../../../shared/helpers/comparator.helper';

export const PrebuyPacingListTableConfig = <GridOptions>{
  columnDefs: [
    {
      headerName: 'Due Date',
      field: 'dueDate',
      headerClass: ['hmx-custom-header'],
      cellClass: ['left-aligned', 'due-date-cell'],
      colId: 'dueDate',
      headerTooltip: 'Due Date',
      cellRenderer: 'tableDateComponent',
      filter: 'agDateColumnFilter',
      comparator: ComparatorHelper.date
    },
    {
      headerName: 'Client',
      field: 'client',
      headerClass: ['hmx-custom-header'],
      cellClass: ['left-aligned'],
      colId: 'client',
      headerTooltip: 'Client',
    },
    {
      headerName: 'C/P/E',
      field: 'cpe',
      headerClass: ['hmx-custom-header'],
      cellClass: ['left-aligned', 'link-color', 'right-floated-expand-icon'],
      colId: 'cpe',
      headerTooltip: 'C/P/E',
      minWidth: 130,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        suppressCount: true, // turn off the row count+
        suppressPadding: true,
        innerRendererFramework: TooltipCellComponent,
      },
    },
    {
      headerName: 'Market',
      field: 'market',
      headerClass: ['hmx-custom-header'],
      cellClass: ['left-aligned'],
      colId: 'market',
      headerTooltip: 'Market',
      cellRenderer: 'tooltipCellComponent',
    },
    {
      headerName: 'Buyer',
      field: 'buyer',
      headerClass: ['hmx-custom-header'],
      cellClass: ['buyer-cell', 'left-aligned', 'link-color'],
      colId: 'buyer',
      headerTooltip: 'Buyer',
      cellRenderer: 'tooltipCellComponent',
      valueGetter: function (params) {
        return {
          tooltipText: 'Contact Buyer',
          text: params.data.buyer
        };
      },
      comparator: ComparatorHelper.intField('text'),
      filter: 'agTextColumnFilter',
      filterParams: {
        textFormatter: function (r) {
          if (r === null) return null; // empty filter criteria or value
          if (r && r.text) return r.text + ''; // buyer name or number as string
          return r; // original filter criteria
        }
      }
    },
    {
      headerName: 'RFP',
      field: 'rfp',
      headerClass: ['hmx-custom-header'],
      cellClass: ['left-aligned'],
      colId: 'rfp',
      headerTooltip: 'RFP',
      cellRenderer: 'tableParentNumberChildDateComponent',
      comparator: ComparatorHelper.int
    },
    {
      headerName: 'NEGO',
      field: 'nego',
      headerClass: ['hmx-custom-header'],
      cellClass: ['left-aligned'],
      colId: 'nego',
      headerTooltip: 'NEGO',
      cellRenderer: 'tableParentNumberChildDateComponent',
      comparator: ComparatorHelper.int
    },
    {
      headerName: 'Budget',
      field: 'budget',
      headerClass: ['hmx-custom-header'],
      cellClass: ['left-aligned', 'budget-cell'],
      colId: 'budget',
      headerTooltip: 'Budget',
      cellRenderer: 'tableBudgetCellComponent',
      cellRendererParams: {
        currencySign: 'USD'
      },
      comparator: ComparatorHelper.float
    },
    {
      headerName: '<70%',
      field: 'lt70',
      colId: 'lt70',
      headerClass: ['red-color', 'goal-cell'],
      cellClass: ['left-aligned', 'link-color'],
      cellRenderer: 'tableGoalsComponent',
      valueGetter: function (params) {
        return {
          left: params.data.lt70_left == undefined ? null : params.data.lt70_left,
          right: params.data.lt70_right == undefined ? null : params.data.lt70_right,
          childValue: params.data.lt70 == null ? null : params.data.lt70,
          goalValue: 'lt70',
        };
      },
      comparator: ComparatorHelper.intField('left'),
      suppressMenu: true
    },
    {
      headerName: '70%-90%',
      field: 'gt70lt90',
      colId: 'gt70lt90',
      headerClass: ['goal-cell'],
      cellClass: ['left-aligned', 'link-color'],
      cellRenderer: 'tableGoalsComponent',
      valueGetter: function (params) {
        return {
          left: params.data.gt70lt90_left == undefined ? null : params.data.gt70lt90_left,
          right: params.data.gt70lt90_right == undefined ? null : params.data.gt70lt90_right,
          childValue: params.data.gt70lt90 == null ? null : params.data.gt70lt90,
          goalValue: 'gt70lt90',
        };
      },
      comparator: ComparatorHelper.intField('left'),
      suppressMenu: true
    },
    {
      headerName: '>90%',
      field: 'gt90',
      colId: 'gt90',
      headerClass: ['green-color', 'goal-cell'],
      cellClass: ['left-aligned', 'link-color'],
      cellRenderer: 'tableGoalsComponent',
      valueGetter: function (params) {
        return {
          left: params.data.gt90_left == undefined ? null : params.data.gt90_left,
          right: params.data.gt90_right == undefined ? null : params.data.gt90_right,
          childValue: params.data.gt90 == null ? null : params.data.gt90,
          goalValue: 'gt90',
        };
      },
      comparator: ComparatorHelper.intField('left'),
      suppressMenu: true
    },
  ],
  frameworkComponents: {
    tableBudgetCellComponent: TableBudgetCellComponent,
    tableDateComponent: TableDateComponent,
    tableGoalsComponent: TableGoalsComponent,
    tooltipCellComponent: TooltipCellComponent,
    tableParentNumberChildDateComponent: TableParentNumberChildDateComponent
  },
  rowData: [],
  rowSelection: 'single',
  getRowClass: function (params) {
    if (params.node.level === 0 && params.node.data.budget > 100) {
      return 'row-huge-budget';
    }
  },
  pagination: true,
  paginationPageSize: 20,
  enableSorting: true,
  enableFilter: true,
  animateRows: true,
  suppressCellSelection: true,
  enableColResize: true,
  suppressDragLeaveHidesColumns: true,
  colResizeDefault: 'shift',
  suppressMenuHide: true,
  headerHeight: 60,
  icons: {
    menu: '<i class="material-icons">filter_list</i>',
    groupExpanded: '<i class="material-icons">keyboard_arrow_up</i>',
    groupContracted: '<i class="material-icons">keyboard_arrow_down</i>',
    sortAscending: '<i class="material-icons">arrow_drop_up</i>',
    sortDescending: '<i class="material-icons">arrow_drop_down</i>',
  },
};
