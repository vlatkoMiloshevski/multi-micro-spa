import { GridOptions, IDatasource, IGetRowsParams } from "ag-grid-community/main";
import { Observable, BehaviorSubject, of } from "rxjs";

import { PageInfo } from "./page-info.model";

export class AgGridDatasource<T> implements IDatasource {
  private innerItems: T[] = [];
  private $errorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  public $error: Observable<any> = this.$errorSubject.asObservable();
  public rowCount: null // behave as infinite scroll

  constructor(private gridOptions: GridOptions, private getDataCallback: GetDataCallback) {}

  public get items(): T[] {
    return this.innerItems;
  }

  public getRows(params: IGetRowsParams): void {
    let getDataParams = <GetDataParams>{};
    if (this.gridOptions.pagination) {
      const pageSize = this.gridOptions.paginationPageSize || 10;
      const pageNumber = params.endRow / pageSize;
      getDataParams = {
        ...{
          page: {
            number: pageNumber,
            size: pageSize
          }
        }
      };
    }

    const sortState = this.gridOptions.api.getSortModel();
    if (sortState.length !== 0) {
      const sort = sortState[0].colId + "," + sortState[0].sort;
      getDataParams = { ...getDataParams, ...{ sort: sort } };
    }

    const filterState = this.gridOptions.api.getFilterModel();
    let filters = [];
    for (let k in filterState) {
      if (filterState.hasOwnProperty(k)) {
        filters.push({
          column: k,
          filter: filterState[k].filter,
          type: filterState[k].type
        });
      }
    }
    if (filters.length) {
      getDataParams = { ...getDataParams, ...{ filters: filters } };
    }

    this.getDataCallback(getDataParams)
    .subscribe(
      (res: GetDataResponse) => {
        let lastRow = res.totalItems ? res.totalItems : res.items.length;
        params.successCallback(res.items, lastRow);
      },
      err => this.$errorSubject.next(err)
    );
  }
}

export interface GetDataParams {
  page?: PageInfo;
  sort?: string;
  filters?: Array<any>;
}

export interface GetDataResponse {
  items: any[];
  totalItems?: number;
}

export type GetDataCallback = (params: GetDataParams) => Observable<GetDataResponse>;
