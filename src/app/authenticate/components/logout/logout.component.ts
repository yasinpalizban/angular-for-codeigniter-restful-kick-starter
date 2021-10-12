import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthenticateService} from '../../services/authenticate.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthenticateService) {
  }

  ngOnInit(): void {
    this.authService.signOut();

  }

  ngOnDestroy(): void {
    this.authService.unsubscribe();
  }

}
