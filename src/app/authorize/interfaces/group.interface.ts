import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IGroup {


  pager?:IPagination;
  data?: [{
    id: number,
    name: string,
    description: string,
  }];

}
