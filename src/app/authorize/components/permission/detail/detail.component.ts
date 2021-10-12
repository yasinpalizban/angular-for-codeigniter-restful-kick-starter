import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';


import {ActivatedRoute, Params, Router} from '@angular/router';
import {IQuery} from '../../../../shared/interfaces/query.interface';

import {LocationChangeListener} from "@angular/common";

import {IPermission} from "../../../interfaces/permission.interface";
import {PermissionService} from "../../../services/permission.service";

@Component({
  selector: 'app-permission-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  id: number;
  subscription$: Subscription[];
  permissionDetail!: IPermission;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: LocationChangeListener): void {

    let params: IQuery = {};


    this.subscription$.push(this.permissionService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {

      params = qParams;


    }));

    this.permissionService.setQueryArgument(params);
    this.router.navigate(['./admin/permission/list'], {
      queryParams: params,

    });
  }

  constructor(
    private permissionService: PermissionService,
    private aRoute: ActivatedRoute, private router: Router) {
    this.id = 0;
    this.subscription$ = [];

  }

  ngOnInit(): void {

    this.subscription$.push(
      this.aRoute.params.pipe().subscribe((params: Params) => {

        this.id = +params.id;

      }));
    this.permissionService.query(this.id);
    this.subscription$.push(
      this.permissionService.getDataObservable().subscribe((permission: IPermission ) => {
        this.permissionDetail = permission;
      }));
  }

  ngOnDestroy(): void {

    this.subscription$.forEach(sub => sub.unsubscribe());

  }
}
