export class UserPermission {

  public id: number | undefined;
  public permissionId: number | undefined;
  public actions: string | undefined;
  public userId: number | undefined;

  constructor(init?: Partial<UserPermission>) {
    Object.assign(this, init);
  }
}
