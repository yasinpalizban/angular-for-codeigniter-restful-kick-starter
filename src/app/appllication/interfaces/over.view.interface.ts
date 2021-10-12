export interface IOverView {

  visitor?: [{
    id: number,
    ip: string,
    country: string,
    city: string,
    lang: string,
    lat: string,
    os: string,
    createdAt: { date: Date, timezone: string, timezone_type: number },
    updatedAt: { date: Date, timezone: string, timezone_type: number },
    deletedAt: { date: Date, timezone: string, timezone_type: number },
  }];
  user?: [{
    id: number,
    email: string,
    username: string,
    status_message: string,
    status: number,
    active: number,
    createdAt: { date: Date, timezone: string, timezone_type: number },
    updatedAt: { date: Date, timezone: string, timezone_type: number },
    deletedAt: { date: Date, timezone: string, timezone_type: number },
    firstName: string,
    lastName: string,
    image: string,
    gender: number,
    birthday: string,
    country: string,
    city: string,
    address: string,
    phone: string,
    group: string,
  }];
  requestPost?: [{
    id: number,
    userId: number,
    categoryId: number,
    title: string,
    body: string,
    status: number,
    category: string,
    language: string,
    username: string,
    lastName: string,
    firstName: string,
    replyCount: number,
    createdAt: { date: Date, timezone: string, timezone_type: number },
    updatedAt: { date: Date, timezone: string, timezone_type: number },
    deletedAt: { date: Date, timezone: string, timezone_type: number },
  }];
  newsPost?: [{
    id: number,
    userId: number,
    categoryId: number,
    subCategoryId: number,
    title: string,
    body: string,
    status: number,
    picture: string,
    category: string,
    subCategory: string,
    username: string,
    lastName: string,
    firstName: string,
    commentCount: number,
    createdAt: { date: Date, timezone: string, timezone_type: number },
    updatedAt: { date: Date, timezone: string, timezone_type: number },
    deletedAt: { date: Date, timezone: string, timezone_type: number },
  }];
  contact?: [{
    id: number,
    title: string,
    name: string,
    email: string,
    message: string,
    reply: string,
    phone: number,
    status: number,
    media?: [{
      id: number,
      contactId: number,
      path: string,
    }]
    createdAt: { date: Date, timezone: string, timezone_type: number },
    updatedAt: { date: Date, timezone: string, timezone_type: number },
    deletedAt: { date: Date, timezone: string, timezone_type: number },

  }];


}
