import {Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';


import {ActivatedRoute, Params, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {IQuery} from '../../../../shared/interfaces/query.interface';

import {faEdit, faTrash, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';
import {IUserPermission} from "../../../interfaces/user.permission.interface";
import {UserPermissionService} from "../../../services/user.permission.service";


@Component({
  selector: 'app-permission-group-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],

})
export class ListComponent implements OnInit, OnDestroy {
  faIcon = {faEdit, faTrash, faEnvelopeOpen};
  subscription$: Subscription[];
  userPermissionRows!: IUserPermission;
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

  constructor(private userPermissionService: UserPermissionService,
              private router: Router,
              private modalService: BsModalService,
              private activatedRoute: ActivatedRoute
  ) {


    this.currentPage = 1;
    this.totalPage = 1;
    this.sizePage = 10;
    this.deleteId = 0;
    this.deleteIndex = 0;
    this.subscription$ = [];
    this.deleteItem = '';
  }

  ngOnInit(): void {


    this.subscription$.push(this.activatedRoute.queryParams.subscribe((params: Params) => {

      if (Object.keys(params).length !== 0) {
        this.userPermissionService.query(params);
      } else {
        this.userPermissionService.query();
      }
      this.userPermissionService.setQueryArgument(params);
    }));


    this.subscription$.push(this.userPermissionService.getDataObservable().subscribe((permission: IUserPermission) => {
      this.userPermissionRows = permission;
      this.totalPage = permission.pager!.total;

      this.currentPage = permission.pager!.currentPage;


    }));


  }

  ngOnDestroy(): void {
    this.subscription$.forEach(sub => sub.unsubscribe());
    this.userPermissionService.unsubscribe();

  }


  onEditItem(id: number): void {


    const params: IQuery = {
      page: this.currentPage,
    };


    this.subscription$.push(this.userPermissionService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {
      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;
    }));

    this.userPermissionService.setQueryArgument(params);
    this.router.navigate(['./admin/user-permission/edit/' + id]);
  }

  onDetailItem(id: number): void {

    this.router.navigate(['./admin/user-permission/detail/' + id]);
  }

  onOpenModal(template: TemplateRef<string>, id: number, index: number): void {

    this.modalRef = this.modalService.show(template);
    this.deleteId = id;
    this.deleteIndex = index;
    this.deleteItem = this.userPermissionRows.data![index].id.toString();

  }

  onModalHide(): void {
    this.modalRef.hide();

  }

  onModalConfirm(): void {
    this.modalRef.hide();

    this.userPermissionService.remove(this.deleteId);
    this.userPermissionRows.data!.splice(this.deleteIndex, 1);
  }


  onChangePaginate($event: PageChangedEvent): void {

    const params: IQuery = {
      page: $event.page,
    };


    this.subscription$.push(this.userPermissionService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {

      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;

    }));

    this.userPermissionService.setQueryArgument(params);
    this.router.navigate(['./admin/user-permission/list'], {
      queryParams: params,

    });
  }


}
