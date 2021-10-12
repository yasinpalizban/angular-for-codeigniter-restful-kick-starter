import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';


import {IQuery} from '../../../../shared/interfaces/query.interface';

import {LocationChangeListener} from "@angular/common";
import {faAsterisk} from "@fortawesome/free-solid-svg-icons";
import {IGroupPermission} from "../../../interfaces/group.permission.interface";
import {GroupPermissionService} from "../../../services/group.permission.service";
import {GroupPermission} from "../../../models/group.permission.model";
import {IGroup} from "../../../interfaces/group.interface";
import {IPermission} from "../../../interfaces/permission.interface";
import {GroupService} from "../../../services/group.service";
import {PermissionService} from "../../../services/permission.service";

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
  permissionGroupDetail!: IGroupPermission;
  groupRows!: IGroup;
  permissionRows!: IPermission;

  isGet: boolean;
  isPut: boolean;
  isPost: boolean;
  isDelete: boolean;
  isCheck: boolean;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: LocationChangeListener): void {

    let params: IQuery = {};


    this.subscription.push(this.permissionGroupService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {

      params = qParams;
    }));

    this.permissionGroupService.setQueryArgument(params);
    this.router.navigate(['./admin/group-permission/list'], {
      queryParams: params,

    });
  }

  constructor(private formBuilder: FormBuilder,
              private permissionGroupService: GroupPermissionService,
              private aRoute: ActivatedRoute,
              private router: Router,
              private groupService: GroupService,
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

  }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({

      permissionId: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      groupId: new FormControl('', [
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
    this.permissionGroupService.query(this.editId);
    this.subscription.push(this.permissionGroupService.getDataObservable().subscribe((permission: IGroupPermission) => {
      this.permissionGroupDetail = permission;

      this.formGroup.controls.groupId.setValue(permission.data![0].groupId);
      this.formGroup.controls.permissionId.setValue(permission.data![0].permissionId);
    }));

    this.permissionGroupDetail.data![0].actions.split("-").forEach(value => {

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

    const permissionGroup = new GroupPermission({
      id: this.editId,
      groupId: this.formGroup.value.groupId,
      permissionId: this.formGroup.value.permissionId,
      actions: combineAction,

    });

    this.permissionGroupService.clearAlert();
    this.permissionGroupService.update(permissionGroup);

  }

  ngOnDestroy(): void {

    this.subscription.forEach(sub => sub.unsubscribe());
    this.permissionGroupService.unsubscribe();


  }

  onCheckboxChange(e: any) {

    const actions: FormArray = this.formGroup.get('actions') as FormArray;

    if (!this.isCheck) {
      this.isCheck = true;
      const actBox = this.permissionGroupDetail.data![0].actions.split("-");
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

}
