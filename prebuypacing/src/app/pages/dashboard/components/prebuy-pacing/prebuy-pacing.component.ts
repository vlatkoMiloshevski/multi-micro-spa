///<reference path="services/toggle-goals.service.ts"/>
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, finalize, takeUntil } from 'rxjs/operators';
import { ColDef, Column, GridOptions } from 'ag-grid-community';
import { Page } from '../../../../shared/models/page.model';
import { PrebuyPacingItem } from '../../models/prebuy-pacing-item.model';
import { PrebuyPacingListTableConfig } from './prebuy-pacing.table-config';
import { SharedStorageService } from '../../../../shared/services/storage.services';
import { MatSlideToggleChange } from '@angular/material';
import { ToggleGoalsService } from './services/toggle-goals.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'hmx-prebuy-pacing',
  templateUrl: './prebuy-pacing.component.html',
  styleUrls: ['./prebuy-pacing.component.scss']
})
export class PrebuyPacingComponent implements OnDestroy, AfterViewInit {
  @Input() dataLoadCallback: () => Observable<Page<PrebuyPacingItem>>;
  @Output() change: EventEmitter<MatSlideToggleChange>;
  public gridOptions: GridOptions;
  public gridColumnApi;
  public prebuyPacingList: any[] = [];
  public fieldsStorageSetting: {} = undefined;
  public allColumnsIsVisible: boolean;
  public primeInGoal: boolean;

  private subscription: Subscription;
  private unsubscribe: Subject<void>;


  constructor(
    private storage: SharedStorageService,
    private toggleGoalsService: ToggleGoalsService
  ) {
    this.unsubscribe = new Subject();
    this.gridOptions = <GridOptions>{
      ...PrebuyPacingListTableConfig,
      ...{
        context: {
          componentParent: this
        },
        getNodeChildDetails: PrebuyPacingComponent.getNodeChildDetails,
        onGridReady: this.onGridReady.bind(this),
        onModelUpdated: this.onModelUpdated.bind(this),
        onPaginationChanged: this.onPaginationChanged.bind(this)
      }
    };
    this.fieldsStorageSetting = this.storage.getAllCampaignFieldList();

    this.subscription = this.toggleGoalsService
      .displayPrimeGoals()
      .subscribe(primeInGoal => { this.primeInGoal = primeInGoal.primeInGoalsChecked; });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngAfterViewInit() {
    this.gridOptions.api.sizeColumnsToFit();
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(500),
        takeUntil(this.unsubscribe)
      )
      .subscribe(e => {
        this.gridOptions.api.sizeColumnsToFit();
      });
  }

  private static getNodeChildDetails(rowItem) {
    if (rowItem.children) {
      return {
        group: true,
        children: rowItem.children.map(c => {
          c.lt70 = c.goal < 70 ? c.goal : null;
          c.gt70lt90 = (c.goal >= 70 && c.goal < 90) ? c.goal : null;
          c.gt90 = c.goal >= 90 ? c.goal : null;
          return c;
        }),
        key: rowItem.id,
      };
    } else {
      return null;
    }
  }

  onGridReady(e) {
    const gridApi = e.api;
    this.gridColumnApi = e.columnApi;
    this.setColumnVisibility();
    this.isAllColumnsSelected();
    this.setRowData(gridApi);
  }

  private setRowData(gridApi) {
    gridApi.showLoadingOverlay();
    this.dataLoadCallback()
      .pipe(
        finalize(() => gridApi.hideOverlay())
      )
      .subscribe(
        (data: Page<PrebuyPacingItem>) => {
          data.items = data.items.map(i => {
            i.dueDate = new Date(i.dueDate);
            return i;
          });
          this.prebuyPacingList = data.items;
          this.gridOptions.api.setRowData(this.prebuyPacingList);
          this.gridOptions.api.sizeColumnsToFit();
        }
      );
  }

  onModelUpdated(e) {
    const gridApi = e.api;
    const keepRenderedRows = e.keepRenderedRows;
    const rowsToDisplayLength = gridApi && gridApi.rowModel.rowsToDisplay.length;

    if (rowsToDisplayLength === 0) {
      gridApi.showNoRowsOverlay();
    }

    if (rowsToDisplayLength > 0) {
      gridApi.hideOverlay();
    }

    if (keepRenderedRows) {
      this.gridOptions.api.sizeColumnsToFit();
    }

    if(this.primeInGoal) {
      this.toggleGoalsService.togglePrimeInGoals(this.primeInGoal);
    }
  }

  onPaginationChanged(e) {
    const isNewPage = e.newPage;
    if (isNewPage) {
      this.gridOptions.api.sizeColumnsToFit();
    }
  }

  onFieldChanged(col) {
    const column: Column = this.gridColumnApi.getColumn(col.colId);
    const columns: Column[] = this.gridColumnApi.getAllGridColumns();

    let visibleColumns: Column[] = [];

    if (columns && columns.length) {
      visibleColumns = columns.filter((item) => {
        return item.isVisible();
      });
      if (column && (visibleColumns.length !== 1 || col.hide)) {
        col.hide = column.isVisible();
        this.gridColumnApi.setColumnVisible(col.colId, !col.hide);
        this.gridOptions.api.sizeColumnsToFit();

        this.fieldsStorageSetting[col.colId].hide = col.hide;
        this.storage.setAllCampaignFieldList(this.fieldsStorageSetting);
      }
    }
    this.isAllColumnsSelected();
  }

  isAllColumnsSelected() {
    const hiddenColumns: Column[] = this.gridColumnApi.getAllGridColumns().filter(col => !col.visible);
    this.allColumnsIsVisible = hiddenColumns.length ? false : true;
  }

  onResetColumns() {
    this.onSelectAllColumns();
    if (this.gridOptions.api.isAnyFilterPresent()) {
      this.gridOptions.api.setQuickFilter('');
    }
  }

  onSelectAllColumns() {
    this.gridColumnApi.getAllGridColumns().filter(col => !col.visible)
      .map(col => {
        this.gridColumnApi.setColumnVisible(col.colId, true);
        this.gridOptions.api.sizeColumnsToFit();
        this.fieldsStorageSetting[col.colId].hide = col.hide;
        this.storage.setAllCampaignFieldList(this.fieldsStorageSetting);
      });
    this.isAllColumnsSelected();
  }

  private setColumnVisibility(): void {
    this.fieldsStorageSetting = this.storage.getAllCampaignFieldList();
    this.gridOptions.columnDefs.map((item: ColDef) => {
      if (!this.fieldsStorageSetting[item.colId]) {
        this.fieldsStorageSetting[item.colId] = {
          colId: item.colId,
          headerName: item.headerName,
          hide: false
        };
      }
      item.hide = this.fieldsStorageSetting[item.colId].hide;
      this.gridColumnApi.setColumnVisible(item.colId, !item.hide);
    });
  }

  onFilterTextBoxChanged(value) {
    this.gridOptions.api.setQuickFilter(value);
  }
}
