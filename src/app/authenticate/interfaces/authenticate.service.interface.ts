import {Auth} from "../models/authenticate.model";

export interface AuthenticateServiceInterface {
  signInJwt(auth: Auth): void;

  signIn(auth: Auth): void;

  signOut(): void;


  activateAccountViaEmail(auth: Auth): void;

  sendActivateCodeViaEmail(auth: Auth): void;

  forgot(auth: Auth): void;

  signUp(auth: Auth): void;

  resetPasswordViaEmail(auth: Auth): void;

  resetPasswordViaSms(auth: Auth): void;

  activateAccountViaSms(auth: Auth): void;

  sendActivateCodeViaSms(auth: Auth): void;
}
