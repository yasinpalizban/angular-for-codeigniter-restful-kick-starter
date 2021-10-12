export interface UrlQueryParamInterface {
  parseStr(str: string): void;
  getQueryValue(name: string): string | undefined;
  getQueryObject(): object;
}
