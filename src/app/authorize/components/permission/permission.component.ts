import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HeaderService} from '../../../admin-area/layout/services/header.service';
import {TranslateService} from '@ngx-translate/core';
import {faList} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit, OnDestroy, DoCheck {
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
        this.subscription.push(this.translate.get(['permission.new']).subscribe(result => this.title = result['permission.new']));
        break;
      case 'edit':
        this.subscription.push(this.translate.get(['permission.edit']).subscribe(result => this.title = result['permission.edit']));

        break;
      case 'list':
        this.subscription.push(this.translate.get(['permission.table']).subscribe(result => this.title = result['permission.table']));

        break;
      case 'detail':
        this.subscription.push(this.translate.get(['permission.detail']).subscribe(result => this.title = result['permission.detail']));

        break;

    }
  }


  ngOnDestroy(): void {
    this.headerService.unsubscribe();
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
