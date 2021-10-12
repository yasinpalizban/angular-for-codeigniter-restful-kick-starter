import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IPermission {


  pager?:IPagination;
  data?: [{
    id: number,
    name: string,
    active: number,
    description: string,
  }];

}
