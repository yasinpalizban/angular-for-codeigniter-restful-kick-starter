import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IGroupPermission {


  pager?:IPagination;
  data?: [{
    id: number,
    permissionId: number,
    groupId: number,
    actions: string,
    permission: string,
    group: string,
  }];

}
