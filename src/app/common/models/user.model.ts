export class User {

  public id: number | undefined;
  public username: string | undefined;
  public email: string | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;
  public phone: string | undefined;
  public password: string | undefined;
  public group: number | undefined;
  public active: number | undefined;
  public status: number | undefined;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
