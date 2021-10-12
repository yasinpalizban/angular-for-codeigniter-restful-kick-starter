import {Component, OnInit, ViewChild} from '@angular/core';

import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {LocalizationService} from "./shared/translate/localization.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-app';
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private router: Router,
              private localizationService: LocalizationService
  ) {

    localStorage.setItem('lang', 'en');
    this.localizationService.initService();
  }


  ngOnInit(): void {
  }
}
