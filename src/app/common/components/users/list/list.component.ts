import {Component, HostListener, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user.service';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {IQuery} from '../../../../shared/interfaces/query.interface';
import {IUser} from '../../../interfaces/user.interface';
import {HttpParams} from '@angular/common/http';
import {ISearch} from '../../../../shared/interfaces/search.interface';
import {RoleType} from '../../../../shared/enums/role.enum';
import {faEdit, faEnvelopeOpen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FunctionSearchType} from "../../../../shared/enums/function.search.enum";


@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],

})
export class ListComponent implements OnInit, OnDestroy {
  faIcon = {faEdit, faTrash, faEnvelopeOpen};
  subscription$: Subscription[];
  userRows!: IUser;
  totalPage: number;
  currentPage: number;
  sizePage: number;
  modalRef!: BsModalRef;
  deleteId: number;
  deleteIndex: number;
  deleteItem: string;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.currentPage !== (+this.activatedRoute.snapshot.queryParams.page)) {
      this.currentPage = this.activatedRoute.snapshot.queryParams.page ? +this.activatedRoute.snapshot.queryParams.page : 1;

    }

  }

  constructor(private userService: UserService,
              private router: Router,
              private modalService: BsModalService,
              private activatedRoute: ActivatedRoute
  ) {

    this.currentPage = 1;
    this.totalPage = 1;
    this.sizePage = 10;
    this.deleteId = 0;
    this.deleteIndex = 0;
    this.deleteItem = '';
    this.subscription$ = [];

  }

  ngOnInit(): void {


    this.subscription$.push(this.activatedRoute.queryParams.subscribe((params: Params) => {
      let queryParam = new HttpParams();
      const searchRule: ISearch = {
        fun: FunctionSearchType.Where,
        sgn: '=',
        jin: 'auth_groups',
        val: RoleType.Member
      };

      queryParam = queryParam.append('name', JSON.stringify(searchRule));
      const query: IQuery = {
        q: queryParam
      };
      if (Object.keys(params).length !== 0) {
        this.userService.query(params);
        this.userService.setQueryArgument(params);
      } else {
        this.userService.query(query);
        this.userService.setQueryArgument(query);

      }

    }));


    this.subscription$.push(this.userService.getDataObservable().subscribe((users: IUser) => {
      this.userRows = users;
      this.totalPage = users.pager!.total;

      this.currentPage = users.pager!.currentPage;


    }));


  }

  ngOnDestroy(): void {
    this.subscription$.forEach(sub => sub.unsubscribe());
    this.userService.unsubscribe();

  }


  onEditItem(id: number): void {
    const params: IQuery = {
      page: this.currentPage
    };


    this.subscription$.push(this.userService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {
      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;
    }));

    this.userService.setQueryArgument(params);
    this.router.navigate(['./admin/user/edit/' + id]);
  }

  onDetailItem(id: number): void {

    this.router.navigate(['./admin/user/detail/' + id]);
  }

  onOpenModal(template: TemplateRef<string>, id: number, index: number): void {

    this.modalRef = this.modalService.show(template);
    this.deleteId = id;
    this.deleteIndex = index;
    this.deleteItem = this.userRows.data![index].username;

  }

  onModalHide(): void {
    this.modalRef.hide();

  }

  onModalConfirm(): void {
    this.modalRef.hide();

    this.userService.remove(this.deleteId);
    this.userRows.data!.splice(this.deleteIndex, 1);
  }


  onChangePaginate($event: PageChangedEvent): void {

    const params: IQuery = {
      page: $event.page,
    };


    this.subscription$.push(this.userService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {

      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;
    }));

    this.userService.setQueryArgument(params);
    this.router.navigate(['./admin/user/list'], {
      queryParams: params,

    });
  }


}
