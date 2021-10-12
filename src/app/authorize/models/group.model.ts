export class Group {

  public id: number | undefined;
  public name: string | undefined;
  public description: string | undefined;

  constructor(init?: Partial<Group>) {
    Object.assign(this, init);
  }
}
