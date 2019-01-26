import { PageInfo} from './page-info.model';

export interface Page<T> {
  items: Array<T>;
  page: PageInfo;
  totalItems: number;
  showSellerName: boolean;
  total: any;
}
