import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from '../../../admin-area/layout/services/header.service';
import { Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {faList} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],

})
export class SettingComponent implements OnInit, OnDestroy, DoCheck {
  title!: string;
  url: string;
  subscription: Subscription[];
  faIcon={faList};
  constructor(private headerService: HeaderService,
              private translate: TranslateService) {

    this.url = '';
    this.subscription = [];
  }

  ngOnInit(): void {
    this.subscription.push(this.headerService.getUrlPath().subscribe(async url => {
      this.url = url;

    }));
    this.onChangeTitle();

  }

  ngDoCheck(): void {
    this.onChangeTitle();
  }

  onChangeTitle(): void {
    switch (this.url) {
      case 'add':
        this.subscription.push(this.translate.get(['setting.new']).subscribe(result => this.title = result['setting.new']));
        break;
      case 'edit':
        this.subscription.push(this.translate.get(['setting.edit']).subscribe(result => this.title = result['setting.edit']));

        break;
      case 'list':
        this.subscription.push(this.translate.get(['setting.table']).subscribe(result => this.title = result['setting.table']));

        break;
      case 'detail':
        this.subscription.push(this.translate.get(['setting.detail']).subscribe(result => this.title = result['setting.detail']));

        break;

    }
  }


  ngOnDestroy(): void {
    this.headerService.unsubscribe();
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
