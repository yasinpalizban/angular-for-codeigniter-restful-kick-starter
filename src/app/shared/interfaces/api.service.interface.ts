import {Observable} from 'rxjs';
import {IQuery} from './query.interface';

export declare interface IApiService<T> {
  get(argument?: number | string | object): Observable<T>;

  post(data: any): Observable<T>;

  put(data: any): Observable<T>;

  postAsync(data: any): Promise<T | void>;

  delete(id: number, foreignKey?: number): Observable<T>;

  getDataObservable(): Observable<T>;

  getQueryArgumentObservable(): Observable<IQuery>;

  setQueryArgument(queries: IQuery): void;

  clearAlert(): void;

  unsubscribe(): void;
}
