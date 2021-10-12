import {Component, HostListener, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {SettingService} from '../../../services/setting.service';
import {ISetting} from '../../../interfaces/setting.interface';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {IQuery} from '../../../../shared/interfaces/query.interface';
import {faEdit, faEnvelopeOpen, faTrash} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-setting-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],


})
export class ListComponent implements OnInit, OnDestroy {
  faIcon = {faEdit, faTrash, faEnvelopeOpen};
  subscription$: Subscription[];
  settingRows!: ISetting;
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

  constructor(private settingService: SettingService,
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

      if (Object.keys(params).length !== 0) {
        this.settingService.query(params);
      } else {
        this.settingService.query();
      }
      this.settingService.setQueryArgument(params);
    }));


    this.subscription$.push(this.settingService.getDataObservable().subscribe((settings) => {
      this.settingRows = settings;
      this.totalPage = settings.pager!.total;
      this.currentPage = settings.pager!.currentPage;


    }));


  }

  ngOnDestroy(): void {
    this.subscription$.forEach(sub => sub.unsubscribe());
    this.settingService.unsubscribe();

  }


  onEditItem(id: number): void {
    const params: IQuery = {
      page: this.currentPage
    };


    this.subscription$.push(this.settingService.getQueryArgumentObservable().subscribe((qParams) => {
      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;
    }));

    this.settingService.setQueryArgument(params);
    this.router.navigate(['./admin/setting/edit/' + id]);
  }

  onDetailItem(id: number): void {

    this.router.navigate(['./admin/setting/detail/' + id]);
  }

  onOpenModal(template: TemplateRef<string>, id: number, index: number): void {

    this.modalRef = this.modalService.show(template);
    this.deleteId = id;
    this.deleteIndex = index;
    this.deleteItem = this.settingRows.data![index].key;
  }

  onModalHide(): void {
    this.modalRef.hide();

  }

  onModalConfirm(): void {
    this.modalRef.hide();

    this.settingService.remove(this.deleteId);
    this.settingRows.data!.splice(this.deleteIndex, 1);
  }


  onChangePaginate($event: PageChangedEvent): void {

    const params: IQuery = {
      page: $event.page,
    };


    this.subscription$.push(this.settingService.getQueryArgumentObservable().subscribe((qParams) => {

      params.sort = qParams.sort;
      params.order = qParams.order;
      params.q = qParams.q;

    }));

    this.settingService.setQueryArgument(params);
    this.router.navigate(['./admin/setting/list'], {
      queryParams: params,

    });
  }


}
