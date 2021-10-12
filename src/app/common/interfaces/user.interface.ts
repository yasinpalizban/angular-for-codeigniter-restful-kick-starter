import {IPagination} from "../../shared/interfaces/pagination.interface";

export interface IUser {

  pager?:IPagination;
  data?: [{
    id: number,
    email: string,
    username: string,
    status_message: string,
    status: number,
    active: number,
    createdAt: { date: Date, timezone: string, timezone_type: number },
    updatedAt: { date: Date, timezone: string, timezone_type: number },
    deletedAt: { date: Date, timezone: string, timezone_type: number },
    firstName: string,
    lastName: string,
    image: string,
    gender: number,
    birthday: string,
    country: string,
    city: string,
    address: string,
    phone: string,
    group: string,
  }];

}
