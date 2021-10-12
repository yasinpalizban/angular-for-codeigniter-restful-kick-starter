import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


import {faAsterisk} from "@fortawesome/free-solid-svg-icons";
import {GroupPermissionService} from "../../../services/group.permission.service";
import {GroupPermission} from "../../../models/group.permission.model";
import {IGroup} from "../../../interfaces/group.interface";
import {GroupService} from "../../../services/group.service";
import {Subscription} from "rxjs";
import {IPermission} from "../../../interfaces/permission.interface";
import {PermissionService} from "../../../services/permission.service";
import {PermissionType} from "../../../../shared/enums/permission.enum";
import {FromEventTarget} from "rxjs/internal/observable/fromEvent";


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
  subscription: Subscription[];
  actionsArray: any;

  constructor(private formBuilder: FormBuilder,
              private groupService: GroupService,
              private  permissionService: PermissionService,
              private permissionGroupService: GroupPermissionService) {
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
      groupId: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      actions: this.formBuilder.array([], [Validators.required])

    });
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

  }

  onSubmit(): void {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;
    const actions: FormArray = this.formGroup.get('actions') as FormArray;
    let combineAction = '';
    actions.controls.forEach(ctl => combineAction += ctl.value);
    const permission = new GroupPermission({
      permissionId: this.formGroup.value.permissionId,
      groupId: this.formGroup.value.groupId,
      actions: combineAction

    });

    this.permissionGroupService.clearAlert();
    this.permissionGroupService.save(permission);

  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
    this.permissionGroupService.unsubscribe();
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
}


