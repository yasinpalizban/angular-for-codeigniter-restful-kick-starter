import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';


import {GroupService} from '../../../services/group.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IQuery} from '../../../../shared/interfaces/query.interface';
import {IGroup} from '../../../interfaces/group.interface';
import {LocationChangeListener} from "@angular/common";

@Component({
  selector: 'app-group-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  id: number;
  subscription$: Subscription[];
  groupDetail!: IGroup;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: LocationChangeListener): void {

    let params: IQuery = {};


    this.subscription$.push(this.groupService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {

      params = qParams;


    }));

    this.groupService.setQueryArgument(params);
    this.router.navigate(['./admin/group/list'], {
      queryParams: params,

    });
  }

  constructor(
    private groupService: GroupService,
    private aRoute: ActivatedRoute, private router: Router) {
    this.id = 0;
    this.subscription$ = [];

  }

  ngOnInit(): void {

    this.subscription$.push(
      this.aRoute.params.pipe().subscribe((params: Params) => {

        this.id = +params.id;

      }));
    this.groupService.query(this.id);
    this.subscription$.push(
      this.groupService.getDataObservable().subscribe((group: IGroup) => {
        this.groupDetail = group;
      }));
  }

  ngOnDestroy(): void {

    this.subscription$.forEach(sub => sub.unsubscribe());

  }
}
