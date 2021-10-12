export class GroupPermission {

  public id: number | undefined;
  public permissionId: number | undefined;
  public actions: string | undefined;
  public groupId: number | undefined;

  constructor(init?: Partial<GroupPermission>) {
    Object.assign(this, init);
  }
}
