import {RoleType} from "../enums/role.enum";

export class GlobalConstants {
  public static links: {
    newsCategory: string, newsSubCategory: string,
    newsMedia: string, newsComment: string, viewMedia: string,
    chatPrivate: string, chatRoom: string, requestCategory: string
  } = {
    newsComment: '/admin/news-comment/list',
    newsMedia: '/admin/news-media/list',
    newsCategory: '/admin/news-category/list',
    newsSubCategory: '/admin/news-sub-category/list',
    viewMedia: '/admin/view-media/list',
    chatPrivate: '/admin/chat/private',
    chatRoom: '/admin/chat/room',
    requestCategory: '/admin/request-category/list',
  };

  public static limitUserMenu: {
    [key: string]: string[]
  } = {
    account: [RoleType.Admin],
    firstPage: [RoleType.Admin,RoleType.Coworker],
    blog: [RoleType.Admin, RoleType.Coworker],
    communicate: [RoleType.Admin, RoleType.Coworker],
    dashboard: [RoleType.Admin, RoleType.Coworker,RoleType.Blogger],
  };

}
