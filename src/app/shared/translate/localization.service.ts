import { Injectable, Optional, SkipSelf } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {LocalizationServiceConfig} from "./localization-service.config";

/**
 * Class representing the translation service.
 */
@Injectable()
export class LocalizationService {
  private _localeId: string = 'en'; // default

  /**
   * @constructor
   * @param {LocalizationService} singleton - the localization service
   * @param {LocalizationServiceConfig} config - the localization config
   * @param {TranslateService} translateService - the translate service
   */
  constructor(
    @Optional() @SkipSelf() private singleton: LocalizationService,
    private config: LocalizationServiceConfig,
    private translateService: TranslateService
  ) {
    if (this.singleton) {
      throw new Error(
        'LocalizationService is already provided by the root module'
      );
    }
    this._localeId = this.config.locale_id;
  }

  /**
   * Initialize the service.
   * @returns {Promise<void>}
   */
  public initService(): Promise<void> {
    this._localeId = localStorage.getItem('language') || 'en';
    return this.useLanguage(this._localeId);
  }

  /**
   * change the selected language
   * @returns {Promise<void>}
   */
  public useLanguage(lang: string): Promise<void> {
    this.translateService.setDefaultLang(lang);
    return this.translateService
      .use(lang)
      .toPromise()
      .catch(() => {
        throw new Error('LocalizationService.init failed');
      });
  }

  /**
   * Gets the instant translated value of a key (or an array of keys).
   * @param key
   * @param interpolateParams
   * @returns {string|any}
   */
  public translate(key: string | string[], interpolateParams?: object): string {
    return this.translateService.instant(key, interpolateParams) as string;
  }
}
