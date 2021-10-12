import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

import {ProfileService} from '../../../../common/services/profile.service';
import {IProfile} from '../../../../common/interfaces/profile.interface';
import {environment} from '../../../../../environments/environment';
import {INotification} from '../../interfaces/notification.interface';
import {HeaderService} from '../../services/header.service';
import {NotificationType} from '../../enums/notification.enum';
import {NotificationIconType} from '../../enums/notification.Icon.enum';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticateService} from '../../../../authenticate/services/authenticate.service';
import {GlobalConstants} from "../../../../shared/configs/global-constants";
import {
  faChartArea, faTachometerAlt, faUsers, faList, faAngleDown,
  faUserFriends, faUserPlus, faBlog, faShoppingCart, faNewspaper, faDesktop, faImage,
  faInbox, faComments, faEnvelope, faBookmark, faBell, faBars, faCog, faTools, faUserCircle,
  faGlobe, faLanguage, faSignOutAlt, faFile, faUserCog,faEye,faRandom,faRetweet
} from "@fortawesome/free-solid-svg-icons";
import {IAuth} from "../../../../authenticate/interfaces/authenticate.interface";

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit, OnDestroy {
  faIcon = {
    faChartArea, faTachometerAlt, faUsers, faList, faAngleDown,
    faUserFriends, faUserPlus, faBlog, faShoppingCart, faNewspaper, faDesktop, faImage,
    faComments, faInbox, faEnvelope, faBookmark, faBell, faBars, faCog, faTools, faUserCircle,
    faGlobe, faLanguage, faSignOutAlt, faFile, faUserCog,faEye,faRandom,faRetweet
  };
  limitUserMenu = GlobalConstants.limitUserMenu;
  isRightSidebar: boolean;
  isLeftSidebar!: boolean;
  isLeftArrow: {
    account: boolean; news: boolean, homePage: boolean,
    communication: boolean; dashboard: boolean, setting: boolean
  };
  isSearch: boolean;
  isNotify: boolean;
  pathLink: string;
  explodeLink: string[];
  links: {
    chat: string,
    profile: string, setting: string, group: string, users: string,
    newsPost: string, advertisement: string, newsCategory: string, newsSubCategory: string,
    newsMedia: string, newsComment: string, contact: string, viewOption: string,
    viewMedia: string, visitor: string, request: string, overView: string, graph: string,
    permission: string, userPermission: string, groupPermission: string
  };

  userName: string;
  fullName: string;

  image: SafeUrl | string;
  subscription: Subscription[];
  notify: INotification[];

  url!: string;
  private userRole: string;

  constructor(private  authService: AuthenticateService,
              private router: Router,
              private aRoute: ActivatedRoute,
              private  profileService: ProfileService,
              private sanitizer: DomSanitizer,
              private headerService: HeaderService,
              private translate: TranslateService) {

    this.pathLink = this.router.url;
    this.image = 'assets/images/icon/default-avatar.jpg';
    this.isRightSidebar = false;
    this.isSearch = false;
    this.isNotify = false;
    this.explodeLink = [];
    this.subscription = [];
    this.isLeftArrow = {
      account: true,
      news: true,
      homePage: true,
      communication: true,
      dashboard: true,
      setting: true
    };
    this.links = {
      overView: '/admin/dashboard/over-view',
      graph: '/admin/dashboard/graph',
      profile: '/admin/profile',
      setting: '/admin/setting/list',
      group: '/admin/group/list',
      users: '/admin/user/list',
      newsPost: '/admin/news-post/list',
      advertisement: '/admin/advertisement/list',
      newsCategory: '/admin/news-category/list',
      newsSubCategory: '/admin/news-sub-category/list',
      newsComment: '/admin/news-comment/list',
      newsMedia: '/admin/news-media/list',
      contact: '/admin/contact/list',
      viewOption: '/admin/view-option/list',
      viewMedia: '/admin/view-media/list',
      visitor: '/admin/visitor/list',
      chat: '/admin/chat/contact',
      request: '/admin/request-post/list',
      permission: '/admin/permission/list',
      userPermission: '/admin/user-permission/list',
      groupPermission: '/admin/group-permission/list',

    };
    this.subscription = [];
    this.notify = [];
    this.fullName = 'NotSet';
    this.userName = 'NotSet';
    this.userRole = this.authService.authChange.value.role?.name!;

  }

  ngOnInit(): void {

    this.headerService.checkUrlParams();
    this.headerService.getExplodeLink().subscribe((value: string[]) => {
      this.explodeLink = value;
    });

    if (localStorage.getItem('user')) {
      const profile: IAuth = JSON.parse(localStorage.getItem('user')!);
      this.image = profile.userInformation?.image!;
      this.userName = profile.userInformation?.userName!;
      this.fullName = profile.userInformation?.email ? profile.userInformation?.firstName! + ' ' + profile.userInformation?.lastName! : profile.userInformation?.phone!;
    } else {
      this.profileService.query();
      this.subscription.push(this.profileService.getDataObservable().subscribe((profile: IProfile) => {
        this.userName = profile.data!.username;
        if (this.fullName) {
          this.fullName = profile.data!.firstName + ' ' + profile.data!.lastName;
        }
        if (profile.data!.image != null) {
          this.image = profile.data!.image;
        }
      }));

    }

    this.headerService.checkNotification();
    this.subscription.push(this.headerService.getNewNotification()
      .subscribe((notify: INotification) => {

        if (Object.keys(notify).length) {
          const index = this.notify.findIndex(no => no.type === notify.type);
          index >= 0 ? this.notify[index].counter! += 1 : this.notify.push(notify);
          this.notify.sort((a, b) => 0 - (a.counter! > b.counter! ? 1 : -1));

        }

      }));

  }

  toggleDropDown(name: string): void {

    if (name === 'search') {
      this.isSearch = !this.isSearch;
      this.isNotify = false;
      this.isRightSidebar = false;
      this.isLeftSidebar = false;
    } else if (name === 'notify') {
      this.isNotify = !this.isNotify;
      this.isSearch = false;
      this.isRightSidebar = false;
      this.isLeftSidebar = false;
    } else if (name === 'rightSideBar') {
      this.isRightSidebar = !this.isRightSidebar;
      this.isSearch = false;
      this.isNotify = false;
      this.isLeftSidebar = false;
    } else {
      this.isRightSidebar = false;
      this.isSearch = false;
      this.isNotify = false;
      this.isLeftSidebar = !this.isLeftSidebar;
    }


  }

  onSignOut(): void {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.profileService.unsubscribe();
    this.headerService.unsubscribe();
    this.subscription.forEach(sub => sub.unsubscribe());

  }

  public getSantizeUrl(url: SafeUrl | string): SafeUrl | string {

    if (url.toString().indexOf('assets') !== -1) {
      return this.image;
    } else if (url.toString().indexOf('public') !== -1) {

      return this.sanitizer.bypassSecurityTrustUrl(environment.siteUrl + url);

    }
    return '';
  }

  appendColorIndex(index: number): string {
    index++;
    if (index <= 6) {
      return 'bg-flat-color-' + index;
    } else if (index % 6 > 0) {
      return 'bg-flat-color-' + index % 6;
    } else {
      return 'bg-flat-color-' + 6;
    }
  }

  appendTypeIcon(type: string): any {

    switch (type) {
      case NotificationType.newUser:
        return this.faIcon.faUserPlus;
      case NotificationType.newChat:
        return this.faIcon.faComments;
      case NotificationType.newChatRoom:
        return this.faIcon.faComments;
      case NotificationType.newContact:
        return this.faIcon.faEnvelope;
      case NotificationType.newOrder:
        return this.faIcon.faFile;
      case NotificationType.newRequest:
        return this.faIcon.faBookmark;
    }

  }

  changeLanguage(): void {

    if (localStorage.getItem('lang') === 'en') {
      localStorage.setItem('lang', 'fa');
      this.translate.use('fa');
    } else if (localStorage.getItem('lang') === 'fa') {
      localStorage.setItem('lang', 'en');
      this.translate.use('en');
    }
  }

  public limitUserMenuLink(key: string): boolean {
    let flag: boolean = false;
    for (let index in this.limitUserMenu) {
      if (this.limitUserMenu.hasOwnProperty(key)) {
        let value = this.limitUserMenu[index];
        value.forEach(val => {
          if (val === this.userRole) {
            flag = true;
          }
        });
      }
    }


    return flag;
  }

}
