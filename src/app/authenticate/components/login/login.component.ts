import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Auth} from '../../models/authenticate.model';
import {AuthenticateService} from '../../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  remember: boolean;

  constructor(private authenticateService: AuthenticateService) {
    this.remember = false;


  }

  ngOnInit(): void {

  }

  onSubmit(ngForm: NgForm): void {


    if (ngForm.invalid) {
      return;

    }

    const auth = new Auth({login: ngForm.value.login, password: ngForm.value.password, remember: this.remember});
    this.authenticateService.signInJwt(auth);

    // ngForm.reset();
  }

  loout(): void {
    this.authenticateService.signOut();
  }

  ngOnDestroy(): void {
    this.authenticateService.unsubscribe();
  }
}
