import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ISetting} from '../../../interfaces/setting.interface';


import {SettingService} from '../../../services/setting.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IQuery} from '../../../../shared/interfaces/query.interface';
import {LocationChangeListener} from "@angular/common";

@Component({
  selector: 'app-setting-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  id: number;
  subscription$: Subscription[];
  settingDetail!: ISetting;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: LocationChangeListener): void {

    let params: IQuery = {};


    this.subscription$.push(this.settingService.getQueryArgumentObservable().subscribe((qParams) => {
      params = qParams;
    }));

    this.settingService.setQueryArgument(params);
    this.router.navigate(['./admin/setting/list'], {
      queryParams: params,

    });
  }

  constructor(
    private settingService: SettingService,
    private aRoute: ActivatedRoute, private router: Router) {
    this.id = 0;

    this.subscription$ = [];

  }

  ngOnInit(): void {

    this.subscription$.push(
      this.aRoute.params.pipe().subscribe((params: Params) => {

        this.id = +params.id;

      }));
    this.settingService.query(this.id);
    this.subscription$.push(
      this.settingService.getDataObservable().subscribe((setting) => {
        this.settingDetail = setting;
      }));
  }

  ngOnDestroy(): void {

    this.subscription$.forEach(sub => sub.unsubscribe());

  }
}

