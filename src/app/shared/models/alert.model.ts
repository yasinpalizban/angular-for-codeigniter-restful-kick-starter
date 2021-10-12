import {AlertType} from '../enums/alert.enum';


export class Alert {
  id: string | undefined;
  type: AlertType | undefined;
  message: string | undefined;
  autoClose: boolean | undefined;
  keepAfterRouteChange: boolean | undefined;
  fade: boolean | undefined;
  body:string[]=[];

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }

}
