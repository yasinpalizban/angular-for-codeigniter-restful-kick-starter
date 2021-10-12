import {Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';


import {ActivatedRoute, Params, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {IQuery} from '../../../../shared/interfaces/query.interface';

import {faEdit, faTrash, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';
import {IGroupPermission} from "../../../interfaces/group.permission.interface";
import {GroupPermissionService} from "../../../services/group.permission.service";


@Component({
  selector: 'app-permission-group-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],

})
export class ListComponent implements OnInit, OnDestroy {
  faIcon = {faEdit, faTrash, faEnvelopeOpen};
  subscription$: Subscription[];
  permissionGroupRows!: IGroupPermission;
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

  constructor(private permissionGroupService: GroupPermissionService,
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
        this.permissionGroupService.query(params);
      } else {
        this.permissionGroupService.query();
      }
      this.permissionGroupService.setQueryArgument(params);
    }));


    this.subscription$.push(this.permissionGroupService.getDataObservable().subscribe((permission: IGroupPermission) => {
      this.permissionGroupRows = permission;
      this.totalPage = permission.pager!.total;

      this.currentPage = permission.pager!.currentPage;


    }));


  }

  ngOnDestroy(): void {
    this.subscription$.forEach(sub => sub.unsubscribe());
    this.permissionGroupService.unsubscribe();

  }


  onEditItem(id: number): void {


    const params: IQuery = {
      page: this.currentPage,
    };


    this.subscription$.push(this.permissionGroupService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {
      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;
    }));

    this.permissionGroupService.setQueryArgument(params);
    this.router.navigate(['./admin/group-permission/edit/' + id]);
  }

  onDetailItem(id: number): void {

    this.router.navigate(['./admin/group-permission/detail/' + id]);
  }

  onOpenModal(template: TemplateRef<string>, id: number, index: number): void {

    this.modalRef = this.modalService.show(template);
    this.deleteId = id;
    this.deleteIndex = index;
    this.deleteItem = this.permissionGroupRows.data![index].id.toString();

  }

  onModalHide(): void {
    this.modalRef.hide();

  }

  onModalConfirm(): void {
    this.modalRef.hide();

    this.permissionGroupService.remove(this.deleteId);
    this.permissionGroupRows.data!.splice(this.deleteIndex, 1);
  }


  onChangePaginate($event: PageChangedEvent): void {

    const params: IQuery = {
      page: $event.page,
    };


    this.subscription$.push(this.permissionGroupService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {

      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;

    }));

    this.permissionGroupService.setQueryArgument(params);
    this.router.navigate(['./admin/group-permission/list'], {
      queryParams: params,

    });
  }


}
