import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HeaderService} from '../../../admin-area/layout/services/header.service';
import {TranslateService} from '@ngx-translate/core';
import {faList} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-permission-User',
  templateUrl: './user.permission.component.html',
  styleUrls: ['./user.permission.component.scss'],
})
export class UserPermissionComponent implements OnInit, OnDestroy, DoCheck {
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
        this.subscription.push(this.translate.get(['permissionUser.edit']).subscribe(result => this.title = result['permissionUser.edit']));

        break;
      case 'list':
        this.subscription.push(this.translate.get(['permissionUser.table']).subscribe(result => this.title = result['permissionUser.table']));

        break;
      case 'detail':
        this.subscription.push(this.translate.get(['permissionUser.detail']).subscribe(result => this.title = result['permissionUser.detail']));

        break;

    }
  }


  ngOnDestroy(): void {
    this.headerService.unsubscribe();
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
