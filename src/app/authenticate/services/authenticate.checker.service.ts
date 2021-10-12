import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IAuth} from "../interfaces/authenticate.interface";
import {map, take} from "rxjs/operators";

interface AuthCheckerServiceInterface {
  isLoggedIn(): Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticateCheckerService implements AuthCheckerServiceInterface {

  authChange: BehaviorSubject<IAuth>;

  constructor() {
    this.authChange = new BehaviorSubject<IAuth>(JSON.parse(localStorage.getItem('user')!));
  }

  public get authValue(): IAuth {
    return this.authChange.value;
  }

  public isLoggedIn(): Observable<boolean> {
    return this.authChange.pipe(take(1), map((authInfo: IAuth) => {
      return !!authInfo;
    }));
  }
}
