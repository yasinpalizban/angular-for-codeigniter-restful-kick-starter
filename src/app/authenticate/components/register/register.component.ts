import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Auth} from '../../models/authenticate.model';
import {MustMatch} from '../../../shared/utils/must-match.validator';
import {AuthenticateService} from '../../services/authenticate.service';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {Subscription} from "rxjs";
import {ReCaptchaV3Service} from "ng-recaptcha";
import {faFacebookF, faInstagram, faGoogle} from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  icons = {faFacebookF, faGoogle, faInstagram};
  fromGroup!: FormGroup;
  submitted: boolean;
  subscription: Subscription[];
  token: string;
  action: string;
  socialUser!: SocialUser;
  isLoggedin!: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticateService,
              private socialAuthService: SocialAuthService,
              private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.submitted = false;
    this.subscription = [new Subscription()];
    this.token = ''
    this.action = 'importantAction';

  }

  ngOnInit(): void {
    this.fromGroup = this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
      ]),
      username: new FormControl('', [
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


    this.subscription.push(this.recaptchaV3Service.execute(this.action)
      .subscribe((token) => {
        this.token = token;
      }));


    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);

    });
  }

  onSubmit(): void {

    if (this.fromGroup.invalid) {
      return;
    }
    this.submitted = true;
    const auth = new Auth({
      username: this.fromGroup.value.username,
      login: this.fromGroup.value.login,
      password: this.fromGroup.value.password,
      passConfirm: this.fromGroup.value.passConfirm,
      socialLogin: "false",
      action: this.action,
      token: this.token
    });
    this.authService.signUp(auth);
    this.fromGroup.reset();
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID, {scope: 'profile email'}).then(data => data);

  }

  signInWithInstagram(): void {
    // this.socialAuthService.signIn().then();
    this.socialAuthService.signOut().then();
  }

  signInWithFB(): void {
    //  this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID,{
    //   scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
    //   return_scopes: true,
    //   enable_profile_selector: true
    // };).then();
  }


  refreshToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy(): void {
    this.authService.unsubscribe();
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
