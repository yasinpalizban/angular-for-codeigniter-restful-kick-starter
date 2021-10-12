
import {ISearch} from "../interfaces/search.interface";
import * as queryString from "query-string";
import {isEmpty} from "../utils/is.empty";
import {UrlQueryParamInterface} from "../interfaces/url.query.param.interface";

export class UrlQueryParam implements  UrlQueryParamInterface{

  private object = new Map<string, string>();
  getQueryObject(): object {
    return this.object.entries();
  }

  getQueryValue(name: string): string | undefined {

    return this.object.get(name);
  }

  parseStr(str: string): void {
    while (true) {
      str = decodeURIComponent(str);
      if (str.indexOf("%") == -1) {
        break;
      }
    }

    const params = queryString.parse(str);


    const arrayParams: any[] = isEmpty(params) ? [] : Object.entries(params);
    for (let i = 0; i < arrayParams.length; i++) {
      let key: string = arrayParams[i][0];
      const valueSearch: ISearch = JSON.parse(arrayParams[i][1]);
      this.object.set(key, <string>valueSearch.val);
    }

  }
}
