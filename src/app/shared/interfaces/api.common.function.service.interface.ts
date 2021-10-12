export declare interface IApiCommonFunction {
  query(argument?: number | string | object): void;

  save?: (data: any) => Promise<void> | void;

  update?: (data: any) => void;

  remove?(id: number, foreignKey?: number): void;

}
