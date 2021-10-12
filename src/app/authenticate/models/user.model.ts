export class User {


  constructor(
    public username: string | undefined,
    public id: number | undefined,
    public jwt: string[] | undefined,
    public role: string | undefined,
    public permissionGroup: string[] | undefined,
    public permissionUser: string[] | undefined) {

  }
}
