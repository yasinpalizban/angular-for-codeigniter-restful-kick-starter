export interface IProfile {


  data?: {
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    image: string,
    address: string;
    country: string,
    city: string,
    gender: string,
    createdAt: { date: Date, timezone: string, timezone_type: number },
    updatedAt: { date: Date, timezone: string, timezone_type: number },
    deletedAt: { date: Date, timezone: string, timezone_type: number },
  };
}
