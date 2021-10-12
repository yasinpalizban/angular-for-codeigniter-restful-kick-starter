import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SettingService} from '../../../services/setting.service';
import {Setting} from '../../../models/setting.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {ISetting} from '../../../interfaces/setting.interface';
import {IQuery} from '../../../../shared/interfaces/query.interface';
import {LocationChangeListener} from "@angular/common";
import {faAddressBook, faEye, faFileWord} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-setting-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  faIcon = {
    faEye, faFileWord, faAddressBook
  };
  formGroup!: FormGroup;
  submitted: boolean;
  editId: number;
  subscription$: Subscription[];
  settingDetail!: ISetting;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: LocationChangeListener): void {

    let params: IQuery = {};


    this.subscription$.push(this.settingService.getQueryArgumentObservable().subscribe((qParams) => {
      params = qParams;
    }));

    this.settingService.setQueryArgument(params);
    this.router.navigate(['./admin/setting/list'], {
      queryParams: params,

    });
  }

  constructor(private formBuilder: FormBuilder,
              private settingService: SettingService,
              private aRoute: ActivatedRoute,
              private router: Router) {
    this.submitted = false;
    this.editId = 0;


    this.subscription$ = [];
  }

  ngOnInit(): void {


    this.formGroup = this.formBuilder.group({

      _key: new FormControl('', []),
      _value: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      status: new FormControl('', [
        Validators.required,
      ]),
    });


    this.subscription$.push(this.aRoute.params.pipe().subscribe((params: Params) => {

      this.editId = +params.id;

    }));
    this.settingService.query(this.editId);
    this.subscription$.push(this.settingService.getDataObservable().subscribe((setting) => {
      this.settingDetail = setting;

      this.formGroup.controls._key.setValue(setting.data![0].key);
      this.formGroup.controls._value.setValue(setting.data![0].value);
      this.formGroup.controls.description.setValue(setting.data![0].description);
      this.formGroup.controls.status.setValue( +setting.data![0].status);

    }));
  }

  onSubmit(): void {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;

    const setting = new Setting({
      id: this.editId,
      value: this.formGroup.value._value.toUpperCase(),
      description: this.formGroup.value.description,
      status: this.formGroup.value.status,

    });
    console.log(setting);
    this.settingService.clearAlert();
    this.settingService.update(setting);

  }

  ngOnDestroy(): void {

    this.subscription$.forEach(sub => sub.unsubscribe());
    this.settingService.unsubscribe();
  }


}
