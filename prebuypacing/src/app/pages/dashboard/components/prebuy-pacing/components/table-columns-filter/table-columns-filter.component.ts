import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';

@Component({
  selector: 'hmx-table-columns-filter',
  templateUrl: './table-columns-filter.component.html',
  styleUrls: ['./table-columns-filter.component.scss'],
})
export class TableColumnsFilterComponent implements OnInit, OnDestroy {
  @Output() fieldToggle = new EventEmitter<boolean>();
  @Output() resetColumns = new EventEmitter<boolean>();
  @Output() filterTextBox = new EventEmitter<string>();
  @Output() selectAllColumns = new EventEmitter<boolean>();
  @Input() fieldsStorageSetting: {} = undefined;
  @Input() allColumnsIsVisible: boolean;
  public fieldsStorageList: Array<any> = [];
  public keyword: string = '';

  private unsubscribe: Subject<void>;

  constructor() {
    this.unsubscribe = new Subject();
  }

  ngOnInit() {
    this.fieldsStorageList = Object.keys(this.fieldsStorageSetting).map(item => this.fieldsStorageSetting[item]);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onClickColumn(event, col) {
    this.fieldToggle.emit(col);
  }

  onSelectAllColumn(event) {
    this.selectAllColumns.emit();
  }

  onResetColumns(event) {
    //document.getElementById('filter-text-box').value = '';
    this.keyword = '';
    this.resetColumns.emit();
    event.stopPropagation();
  }

  onFilterTextBoxChanged(event) {
    this.filterTextBox.emit(this.keyword);
    //gridOptions.api.setQuickFilter(document.getElementById('filter-text-box').value);
  }
}
