import {Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {GroupService} from '../../../services/group.service';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {IQuery} from '../../../../shared/interfaces/query.interface';
import {IGroup} from '../../../interfaces/group.interface';
import {faEdit, faTrash, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-group-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],

})
export class ListComponent implements OnInit, OnDestroy {
  faIcon = {faEdit, faTrash, faEnvelopeOpen};
  subscription$: Subscription[];
  groupRows: IGroup;
  totalPage: number;
  currentPage: number;
  sizePage: number;
  modalRef!: BsModalRef;
  deleteId: number;
  deleteIndex: number;
  deleteItem: string;
  @HostListener('mouseenter')
  onMouseEnter(): void  {
    if (this.currentPage !== (+this.activatedRoute.snapshot.queryParams.page)) {
      this.currentPage = this.activatedRoute.snapshot.queryParams.page ? +this.activatedRoute.snapshot.queryParams.page : 1;

    }

  }

  constructor(private groupService: GroupService,
              private router: Router,
              private modalService: BsModalService,
              private activatedRoute: ActivatedRoute
  ) {

    this.groupRows = {};
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
        this.groupService.query(params);
      } else {
        this.groupService.query();
      }
      this.groupService.setQueryArgument(params);
    }));


    this.subscription$.push(this.groupService.getDataObservable().subscribe((groups: IGroup) => {
      this.groupRows = groups;
      this.totalPage = groups.pager!.total;

      this.currentPage = groups.pager!.currentPage;


    }));


  }

  ngOnDestroy(): void  {
    this.subscription$.forEach(sub => sub.unsubscribe());
    this.groupService.unsubscribe();

  }


  onEditItem(id: number): void  {


    const params: IQuery = {
      page: this.currentPage,
    };


    this.subscription$.push(this.groupService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {
      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;
    }));

    this.groupService.setQueryArgument(params);
    this.router.navigate(['./admin/group/edit/' + id]);
  }

  onDetailItem(id: number): void  {

    this.router.navigate(['./admin/group/detail/' + id] );
  }

  onOpenModal(template: TemplateRef<string>, id: number, index: number): void  {

    this.modalRef = this.modalService.show(template);
    this.deleteId = id;
    this.deleteIndex = index;
    this.deleteItem = this.groupRows.data![index].name;

  }

  onModalHide(): void  {
    this.modalRef.hide();

  }

  onModalConfirm(): void  {
    this.modalRef.hide();

    this.groupService.remove(this.deleteId);
    this.groupRows.data!.splice(this.deleteIndex, 1);
  }


  onChangePaginate($event: PageChangedEvent): void  {

    const params: IQuery = {
      page: $event.page,
    };


    this.subscription$.push(this.groupService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {

      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;

    }));

    this.groupService.setQueryArgument(params);
    this.router.navigate(['./admin/group/list'], {
      queryParams: params,

    });
  }


}
