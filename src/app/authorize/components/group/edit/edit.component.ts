import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../services/group.service';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {IGroup} from '../../../interfaces/group.interface';
import {IQuery} from '../../../../shared/interfaces/query.interface';
import {Group} from '../../../models/group.model';
import {LocationChangeListener} from "@angular/common";
import {faFileWord, faStickyNote} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-group-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  faIcon = { faStickyNote, faFileWord};
  formGroup!: FormGroup;
  submitted: boolean;
  editId: number;
  subscription$: Subscription[];
  settingDetail!: IGroup;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: LocationChangeListener): void  {

    let params: IQuery = {};


    this.subscription$.push(this.groupService.getQueryArgumentObservable().subscribe((qParams: IQuery) => {

      params = qParams;
    }));

    this.groupService.setQueryArgument(params);
    this.router.navigate(['./admin/group/list'], {
      queryParams: params,

    });
  }

  constructor(private formBuilder: FormBuilder,
              private groupService: GroupService,
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

    });


    this.subscription$.push(this.aRoute.params.pipe().subscribe((params: Params) => {

      this.editId = +params.id;

    }));
    this.groupService.query(this.editId);
    this.subscription$.push(this.groupService.getDataObservable().subscribe((group: IGroup) => {
      this.settingDetail = group;

      this.formGroup.controls.name.setValue(group.data![0].name);
      this.formGroup.controls.description.setValue(group.data![0].description);

    }));
  }

  onSubmit(): void  {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;

    const group = new Group({
      id: this.editId,
      name: this.formGroup.value.name.toLowerCase(),
      description: this.formGroup.value.description,

    });

    this.groupService.clearAlert();
    this.groupService.update(group);

  }

  ngOnDestroy(): void  {

    this.subscription$.forEach(sub => sub.unsubscribe());
    this.groupService.unsubscribe();
  }


}
