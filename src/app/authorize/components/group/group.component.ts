import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HeaderService} from '../../../admin-area/layout/services/header.service';
import {TranslateService} from '@ngx-translate/core';
import {faList} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit, OnDestroy, DoCheck {
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
        this.subscription.push(this.translate.get(['group.new']).subscribe(result => this.title = result['group.new']));
        break;
      case 'edit':
        this.subscription.push(this.translate.get(['group.edit']).subscribe(result => this.title = result['group.edit']));

        break;
      case 'list':
        this.subscription.push(this.translate.get(['group.table']).subscribe(result => this.title = result['group.table']));

        break;
      case 'detail':
        this.subscription.push(this.translate.get(['group.detail']).subscribe(result => this.title = result['group.detail']));

        break;

    }
  }


  ngOnDestroy(): void {
    this.headerService.unsubscribe();
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
