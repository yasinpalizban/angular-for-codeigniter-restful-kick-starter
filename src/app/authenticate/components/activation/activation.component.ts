import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Auth} from '../../models/authenticate.model';
import {ActivatedRoute, Params} from '@angular/router';
import {AuthenticateService} from '../../services/authenticate.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit, OnDestroy {
  formGroupEmail!: FormGroup;
  formGroupSms!: FormGroup;
  submitted: boolean;
  submitted2: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticateService,
              private activatedRoute: ActivatedRoute) {
    this.submitted = false;
    this.submitted2 = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (!params) {

        this.authService.activateAccountViaEmail(params['token']);
      }
    });

    this.formGroupEmail = this.formBuilder.group({
      token: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)

      ]),
    });

    this.formGroupSms = this.formBuilder.group({
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)

      ]),
    });

  }

  onSubmit(): void {
    if (this.formGroupEmail.invalid) {
      return;
    }
    this.submitted = true;

    const auth = new Auth({
      token: this.formGroupEmail.value.token.replace(/\s/g, ""),
      email: this.formGroupEmail.value.email.replace(/\s/g, "")
    });
    this.authService.activateAccountViaEmail(auth);
  }

  onSubmit2(): void {


    if (this.formGroupSms.invalid) {
      return;
    }

    this.submitted2 = true;
    const auth = new Auth({
      code: this.formGroupSms.value.code.replace(/\s/g, ""),
      phone: this.formGroupSms.value.phone.replace(/\s/g, "")
    });
    this.authService.activateAccountViaSms(auth);
  }

  ngOnDestroy(): void {
    this.authService.unsubscribe();
  }

  onClearAlert(): void {
    this.authService.clearAlert();
  }

  onSendSms(): void {

    if (this.formGroupSms.controls.phone.invalid) {
      return;
    }
    const auth = new Auth({
      phone: this.formGroupSms.value.phone,
    });

    this.authService.sendActivateCodeViaSms(auth);
  }

  onSendEmail(): void {

    if (this.formGroupEmail.controls.email.invalid) {
      return;
    }
    const auth = new Auth({
      email: this.formGroupEmail.value.email
    });

    this.authService.sendActivateCodeViaEmail(auth);
  }
}
