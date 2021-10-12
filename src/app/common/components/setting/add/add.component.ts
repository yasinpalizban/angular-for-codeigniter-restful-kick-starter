import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SettingService} from '../../../services/setting.service';
import {Setting} from '../../../models/setting.model';
import {faEye,
faFileWord, faAddressBook} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-setting-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  faIcon = {faEye,faFileWord, faAddressBook
  };
  formGroup!: FormGroup;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private settingService: SettingService) {
    this.submitted = false;


  }

  ngOnInit(): void {


    this.formGroup = this.formBuilder.group({

      _key: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
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


  }

  onSubmit(): void {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;
    const setting = new Setting({
        key: this.formGroup.value._key.toUpperCase() ,
        value: this.formGroup.value._value.toUpperCase(),
        description: this.formGroup.value.description,
        status: this.formGroup.value.status,
      });

    this.settingService.clearAlert();
    this.settingService.save(setting);

  }

  ngOnDestroy(): void {

    this.settingService.unsubscribe();
  }

}
