import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {IQuery} from '../../../../shared/interfaces/query.interface';
import {IUser} from '../../../interfaces/user.interface';
import {User} from '../../../models/user.model';
import {LocationChangeListener} from "@angular/common";
import {IGroup} from "../../../../authorize/interfaces/group.interface";
import {GroupService} from "../../../../authorize/services/group.service";
import {faAsterisk, faEnvelope, faPhone, faUser, faUsers, faEye} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  faIcon = {
    faPhone,
    faUser, faAsterisk, faEnvelope, faUsers, faEye
  };
  formGroup!: FormGroup;
  submitted: boolean;
  editId: number;
  subscription$: Subscription[];
  userDetail!: IUser;
  groupRows!: IGroup;


  @HostListener('window:popstate', ['$event'])
  onPopState(event: LocationChangeListener): void {

    let params: IQuery = {};


    this.subscription$.push(this.userService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {

      params = qParams;
    }));

    this.userService.setQueryArgument(params);
    this.router.navigate(['./admin/user/list'], {
      queryParams: params,

    });
  }

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private aRoute: ActivatedRoute,
              private router: Router,
              private groupService: GroupService) {
    this.submitted = false;
    this.editId = 0;
    this.subscription$ = [];
  }

  ngOnInit(): void {


    this.formGroup = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      activate: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      groupId: new FormControl('', [
        Validators.required,
      ])

    });


    this.subscription$.push(this.aRoute.params.pipe().subscribe((params: Params) => {

      this.editId = +params.id;

    }));
    this.userService.query(this.editId);
    this.subscription$.push(this.userService.getDataObservable().subscribe((user: IUser) => {
      this.userDetail = user;
      this.formGroup.controls.lastName.setValue(user.data![0].lastName);
      this.formGroup.controls.firstName.setValue(user.data![0].firstName);
      this.formGroup.controls.activate.setValue(user.data![0].status);
      this.formGroup.controls.groupId.setValue(user.data![0].group);

    }));


    this.groupService.query();
    this.subscription$.push(this.groupService.getDataObservable().subscribe((groups: IGroup) => {
      this.groupRows = groups;
    }));
  }

  onSubmit(): void {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;

    const user = new User({
      id: this.editId,
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      status: this.formGroup.value.activate,
      group: this.formGroup.value.groupId,
    });
    this.userService.clearAlert();
    this.userService.update(user);

  }

  ngOnDestroy(): void {

    this.subscription$.forEach(sub => sub.unsubscribe());
    this.userService.unsubscribe();
  }


}
