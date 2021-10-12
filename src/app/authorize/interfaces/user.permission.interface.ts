import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IUserPermission {

  pager?:IPagination;
  data?: [{
    id: number,
    permissionId: number,
    userId: number,
    actions: string,
    permission: string,
    username: string,
    firstName: string,
    lastName: string,
  }];

}
