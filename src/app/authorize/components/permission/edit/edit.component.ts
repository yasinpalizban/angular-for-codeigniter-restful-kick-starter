import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';


import {IQuery} from '../../../../shared/interfaces/query.interface';

import {LocationChangeListener} from "@angular/common";
import {faFileWord, faStickyNote,faEye} from "@fortawesome/free-solid-svg-icons";
import {IPermission} from "../../../interfaces/permission.interface";
import {PermissionService} from "../../../services/permission.service";
import {Permission} from "../../../models/permission.model";

@Component({
  selector: 'app-permission-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  faIcon = {faStickyNote, faFileWord,faEye};
  formGroup!: FormGroup;
  submitted: boolean;
  editId: number;
  subscription$: Subscription[];
  permissionDetail!: IPermission;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: LocationChangeListener): void {

    let params: IQuery = {};


    this.subscription$.push(this.permissionService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {

      params = qParams;
    }));

    this.permissionService.setQueryArgument(params);
    this.router.navigate(['./admin/permission/list'], {
      queryParams: params,

    });
  }

  constructor(private formBuilder: FormBuilder,
              private permissionService: PermissionService,
              private aRoute: ActivatedRoute,
              private router: Router) {
    this.submitted = false;
    this.editId = 0;


    this.subscription$ = [];
  }

  ngOnInit(): void {


    this.formGroup = this.formBuilder.group({


      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      active: new FormControl('', [
      Validators.required,
    ]),

    });


    this.subscription$.push(this.aRoute.params.pipe().subscribe((params: Params) => {

      this.editId = +params.id;

    }));
    this.permissionService.query(this.editId);
    this.subscription$.push(this.permissionService.getDataObservable().subscribe((permission: IPermission) => {
      this.permissionDetail = permission;

      this.formGroup.controls.name.setValue(permission.data![0].name);
      this.formGroup.controls.description.setValue(permission.data![0].description);
      this.formGroup.controls.active.setValue(permission.data![0].active);

    }));
  }

  onSubmit(): void {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;

    const permission = new Permission({
      id: this.editId,
      name: this.formGroup.value.name.toLowerCase(),
      description: this.formGroup.value.description,
      active: this.formGroup.value.active,

    });

    this.permissionService.clearAlert();
    this.permissionService.update(permission);

  }

  ngOnDestroy(): void {

    this.subscription$.forEach(sub => sub.unsubscribe());
    this.permissionService.unsubscribe();
  }


}
