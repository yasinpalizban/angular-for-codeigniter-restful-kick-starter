import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HeaderService} from '../../../admin-area/layout/services/header.service';
import {TranslateService} from '@ngx-translate/core';
import {faList} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-permission-group',
  templateUrl: './group.permissioncomponent.html',
  styleUrls: ['./group.permission.component.scss'],
})
export class GroupPermissionComponent implements OnInit, OnDestroy, DoCheck {
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
        this.subscription.push(this.translate.get(['permissionGroup.edit']).subscribe(result => this.title = result['permissionGroup.edit']));

        break;
      case 'list':
        this.subscription.push(this.translate.get(['permissionGroup.table']).subscribe(result => this.title = result['permissionGroup.table']));

        break;
      case 'detail':
        this.subscription.push(this.translate.get(['permissionGroup.detail']).subscribe(result => this.title = result['permissionGroup.detail']));

        break;

    }
  }


  ngOnDestroy(): void {
    this.headerService.unsubscribe();
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
