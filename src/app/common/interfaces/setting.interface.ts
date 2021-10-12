import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface ISetting {

  pager?:IPagination;
  data?: [{
    id: number,
    key: string,
    value: string,
    description: string,
    status: number,
    createdAt: { date: Date, timezone: string, timezone_type: number },
    updatedAt: { date: Date, timezone: string, timezone_type: number },
    deletedAt: { date: Date, timezone: string, timezone_type: number },
  }];

}
