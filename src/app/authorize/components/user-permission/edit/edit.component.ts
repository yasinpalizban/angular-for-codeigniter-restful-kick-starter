import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';


import {IQuery} from '../../../../shared/interfaces/query.interface';

import {LocationChangeListener} from "@angular/common";
import {faAsterisk} from "@fortawesome/free-solid-svg-icons";
import {IUserPermission} from "../../../interfaces/user.permission.interface";
import {UserPermissionService} from "../../../services/user.permission.service";
import {UserPermission} from "../../../models/user.permission.model";
import {IGroup} from "../../../interfaces/group.interface";
import {IPermission} from "../../../interfaces/permission.interface";
import {GroupService} from "../../../services/group.service";
import {PermissionService} from "../../../services/permission.service";
import {PermissionType} from "../../../../shared/enums/permission.enum";
import {ISearch} from "../../../../shared/interfaces/search.interface";
import {HttpParams} from "@angular/common/http";
import {IUser} from "../../../../common/interfaces/user.interface";
import {UserService} from "../../../../common/services/user.service";

@Component({
  selector: 'app-permission-group-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  faIcon = {faAsterisk};
  formGroup!: FormGroup;
  submitted: boolean;
  editId: number;
  subscription: Subscription[];
  permissionUserDetail!: IUserPermission;
  groupRows!: IGroup;
  permissionRows!: IPermission;
  usersRows!: IUser;
  actionsArray: any;
  isGet: boolean;
  isPut: boolean;
  isPost: boolean;
  isDelete: boolean;
  isCheck: boolean;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: LocationChangeListener): void {

    let params: IQuery = {};


    this.subscription.push(this.userPermissionService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {

      params = qParams;
    }));

    this.userPermissionService.setQueryArgument(params);
    this.router.navigate(['./admin/user-permission/list'], {
      queryParams: params,

    });
  }

  constructor(private formBuilder: FormBuilder,
              private userPermissionService: UserPermissionService,
              private aRoute: ActivatedRoute,
              private router: Router,
              private groupService: GroupService,
              private  userService: UserService,
              private  permissionService: PermissionService,
  ) {
    this.submitted = false;
    this.editId = 0;


    this.isDelete = false;
    this.isGet = false;
    this.isPost = false;
    this.isPut = false;
    this.isCheck = false;
    this.subscription = [];
    this.actionsArray = [
      {value: "-get", name: PermissionType.Get},
      {value: "-post", name: PermissionType.Post},
      {value: "-put", name: PermissionType.Put},
      {value: "-delete", name: PermissionType.Delete},
    ];
  }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({

      permissionId: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      userId: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      actions: this.formBuilder.array([], [])

    });


    this.subscription.push(this.aRoute.params.pipe().subscribe((params: Params) => {

      this.editId = +params.id;

    }));


    this.groupService.query();

    this.subscription.push(
      this.groupService.getDataObservable().subscribe((groups: IGroup) => {
        this.groupRows = groups;

      })
    );
    this.permissionService.query();
    this.subscription.push(
      this.permissionService.getDataObservable().subscribe((permision: IPermission) => {
        this.permissionRows = permision;
      })
    );
    this.userPermissionService.query(this.editId);
    this.subscription.push(this.userPermissionService.getDataObservable().subscribe((permission: IUserPermission) => {
      this.permissionUserDetail = permission;

      this.formGroup.controls.userId.setValue(permission.data![0].userId);
      this.formGroup.controls.permissionId.setValue(permission.data![0].permissionId);

    }));


    this.permissionUserDetail.data![0].actions.split("-").forEach(value => {

      if (value === "get")
        this.isGet = true;
      else if (value === "post")
        this.isPost = true;

      else if (value === "put")
        this.isPut = true;

      else if (value === "delete")
        this.isDelete = true;

    });
  }

  onSubmit(): void {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;
    const actions: FormArray = this.formGroup.get('actions') as FormArray;
    let combineAction = '';
    actions.controls.forEach(ctl => combineAction += ctl.value);



    const userPermission = new UserPermission({
      id: this.editId,
      userId: this.formGroup.value.userId,
      permissionId: this.formGroup.value.permissionId,
      actions: combineAction,

    });

    this.userPermissionService.clearAlert();
    this.userPermissionService.update(userPermission);

  }

  ngOnDestroy(): void {

    this.subscription.forEach(sub => sub.unsubscribe());
    this.userPermissionService.unsubscribe();
  }

  onCheckboxChange(e: any) {

    const actions: FormArray = this.formGroup.get('actions') as FormArray;

    if (!this.isCheck) {
      this.isCheck = true;
      const actBox = this.permissionUserDetail.data![0].actions.split("-");
      actBox.forEach(value => {
        if (value)
          actions.push(new FormControl("-" + value));

      });
    }
    if (e.target.checked) {

      const index = actions.controls.findIndex(x => x.value === e.target.value);
      if (index == -1)
        actions.push(new FormControl(e.target.value));
    } else {

      const index = actions.controls.findIndex(x => x.value === e.target.value);

      actions.removeAt(index);
    }


  }


  onChangeGroup(value: any): void {


    const search: ISearch = {
      fun: 'whr',
      sgn: '=',
      jin: 'auth_groups',
      val: value.target.value
    };


    const queryParam = new HttpParams().append('name', JSON.stringify(search));
    const params: IQuery = {
      q: queryParam
    };


    this.userService.query(params);

    this.subscription.push(this.userService.getDataObservable().subscribe((users: IUser) => {
      this.usersRows = users;


    }));

  }
}
