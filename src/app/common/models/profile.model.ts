export class Profile {

  public firstName: string | undefined;
  public lastName: string | undefined;
  public phone: string | undefined;
  public address: string | undefined;
  public password: string | undefined;
  public passConfirm: string | undefined;
  public gender: string | undefined;
  public country: string | undefined;
  public city: string | undefined;
  public image: File | undefined;

  constructor(init?: Partial<Profile>) {
    Object.assign(this, init);
  }
}
