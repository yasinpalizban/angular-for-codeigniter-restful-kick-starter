import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {MustMatch} from '../../../shared/utils/must-match.validator';
import {Auth} from '../../models/authenticate.model';
import {AuthenticateService} from '../../services/authenticate.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {


  fromGroupEmail!: FormGroup;
  fromGroupSms!: FormGroup;
  submitted: boolean;
  submitted2: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticateService) {
    this.submitted = false;
    this.submitted2 = false;
  }

  ngOnInit(): void {
    this.fromGroupEmail = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      token: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      passConfirm: new FormControl('', [
        Validators.required,

      ]),
    }, {
       validators: MustMatch('password', 'passConfirm')
    });
    this.fromGroupSms = this.formBuilder.group({
      code: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      passConfirm: new FormControl('', [
        Validators.required,

      ]),
    }, {
      validators: MustMatch('password', 'passConfirm')
    });
  }

  onSubmit(): void {

    if (this.fromGroupEmail.invalid) {
      return;
    }
    this.submitted2 = true;
    const auth = new Auth({
      email: this.fromGroupEmail.value.email,
      token: this.fromGroupEmail.value.token,
      password: this.fromGroupEmail.value.password,
      passConfirm: this.fromGroupEmail.value.passConfirm
    });
    this.authService.resetPasswordViaEmail(auth);
    this.fromGroupEmail.reset();
  }

  onSubmit2(): void {

    if (this.fromGroupSms.invalid) {
      return;
    }
    this.submitted2 = true;
    const auth = new Auth({
      code: this.fromGroupSms.value.code,
      phone: this.fromGroupSms.value.phone,
      password: this.fromGroupSms.value.password,
      passConfirm: this.fromGroupSms.value.passConfirm
    });
    this.authService.resetPasswordViaSms(auth);
    this.fromGroupEmail.reset();
  }

  onClearAlert(): void {
    this.authService.clearAlert();
  }

  ngOnDestroy(): void {
    this.authService.unsubscribe();
  }
}
