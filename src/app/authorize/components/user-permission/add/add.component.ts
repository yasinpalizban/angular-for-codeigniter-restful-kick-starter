import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


import {faAsterisk} from "@fortawesome/free-solid-svg-icons";
import {UserPermissionService} from "../../../services/user.permission.service";
import {UserPermission} from "../../../models/user.permission.model";
import {IGroup} from "../../../interfaces/group.interface";
import {GroupService} from "../../../services/group.service";
import {Subscription} from "rxjs";
import {IPermission} from "../../../interfaces/permission.interface";
import {PermissionService} from "../../../services/permission.service";
import {PermissionType} from "../../../../shared/enums/permission.enum";
import {UserService} from "../../../../common/services/user.service";
import {IQuery} from "../../../../shared/interfaces/query.interface";
import {ISearch} from "../../../../shared/interfaces/search.interface";
import {HttpParams} from "@angular/common/http";
import {IUser} from "../../../../common/interfaces/user.interface";


@Component({
  selector: 'app-permission-group-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  faIcon = {faAsterisk};
  formGroup!: FormGroup;
  submitted: boolean;
  groupRows!: IGroup;
  permissionRows!: IPermission;
  usersRows!: IUser;
  subscription: Subscription[];
  actionsArray: any;

  constructor(private formBuilder: FormBuilder,
              private groupService: GroupService,
              private  permissionService: PermissionService,
              private  userService: UserService,
              private userPermissionService: UserPermissionService) {
    this.submitted = false;
    this.subscription = [new Subscription()];
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
      actions: this.formBuilder.array([], [Validators.required])

    });
    const search: ISearch = {
      fun: 'whr',
      sgn: '!=',
      val: 'member'
    };

    const queryParam = new HttpParams().append('name', JSON.stringify(search));


    const groupQuery: IQuery = {
      q: queryParam
    }
    this.groupService.query(groupQuery);

    this.subscription.push(
      this.groupService.getDataObservable().subscribe((groups: IGroup) => {
        this.groupRows = groups;

      })
    );

    this.permissionService.query();
    this.subscription.push(
      this.permissionService.getDataObservable().subscribe((permission: IPermission) => {
        this.permissionRows = permission;
      })
    );


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
      permissionId: this.formGroup.value.permissionId,
      userId: this.formGroup.value.userId,
      actions: combineAction

    });

    this.userPermissionService.clearAlert();
    this.userPermissionService.save(userPermission);

  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
    this.userPermissionService.unsubscribe();
  }


  onCheckboxChange(e: any) {

    const actions: FormArray = this.formGroup.get('actions') as FormArray;
    if (e.target.checked) {
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
      console.log(users);

    }));

  }
}


