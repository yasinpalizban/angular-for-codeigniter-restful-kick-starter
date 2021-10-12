import {ISearch} from './search.interface';
import {HttpParams} from '@angular/common/http';

export interface IQuery {
  page?: number;
  limit?: number;
  offset?: number;
  sort?: string;
  order?: string;
  range?: string;
  filed?: string;
  q?: HttpParams;
  foreignKey?: number;
  selfId?: number;

}
