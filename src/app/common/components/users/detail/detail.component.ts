import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';


import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IQuery} from '../../../../shared/interfaces/query.interface';
import {IUser} from '../../../interfaces/user.interface';
import {LocationChangeListener} from "@angular/common";

@Component({
  selector: 'app-user-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  id: number;
  subscription$: Subscription[];
  userDetail!: IUser;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: LocationChangeListener): void {

    let params: IQuery = {};


    this.subscription$.push(this.userService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {
      params = qParams;
    }));

    this.userService.setQueryArgument(params);
    this.router.navigate(['./admin/user/list'], {
      queryParams: params,

    });
  }

  constructor(
    private userService: UserService,
    private aRoute: ActivatedRoute, private router: Router) {
    this.id = 0;
    this.subscription$ = [];

  }

  ngOnInit(): void {

    this.subscription$.push(
      this.aRoute.params.pipe().subscribe((params: Params) => {

        this.id = +params.id;

      }));
    this.userService.query(this.id);
    this.subscription$.push(
      this.userService.getDataObservable().subscribe((user: IUser) => {
        this.userDetail = user;
      }));
  }

  ngOnDestroy(): void {

    this.subscription$.forEach(sub => sub.unsubscribe());

  }
}
