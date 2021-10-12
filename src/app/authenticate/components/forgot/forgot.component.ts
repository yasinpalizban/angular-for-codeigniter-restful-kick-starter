import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Auth} from '../../models/authenticate.model';
import {OnExecuteData, OnExecuteErrorData, RecaptchaErrorParameters, ReCaptchaV3Service} from 'ng-recaptcha';
import {Subscription} from 'rxjs';
import {AuthenticateService} from '../../services/authenticate.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit, OnDestroy {
  fromGroup!: FormGroup;
  submitted: boolean;
  subscription: Subscription;
  private token: string;
  private action: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticateService,
              private recaptchaV3Service: ReCaptchaV3Service) {
    this.submitted = false;
    this.subscription = new Subscription();
    this.token = ''
    this.action = 'importantAction';
  }


  ngOnInit(): void {
    this.fromGroup = this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
      ])
    });
    this.subscription = this.recaptchaV3Service.execute(this.action)
      .subscribe((token) => {
        this.token = token;
      });
  }


  onSubmit(): void {

    if (this.fromGroup.invalid) {
      return;
    }
    this.submitted = true;
    const auth = new Auth({
      login: this.fromGroup.value.login,
      token: this.token,
      action: this.action
    });
    this.authService.forgot(auth);
    this.fromGroup.reset();
  }


  ngOnDestroy(): void {
    this.authService.unsubscribe();
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
