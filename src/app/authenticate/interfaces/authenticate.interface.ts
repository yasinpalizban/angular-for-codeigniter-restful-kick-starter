export interface IAuth {
  csrf?: string;
  success?: boolean;
  jwt?: {
    token: string,
    expire: number
  };

  role?: {
    name: string,
    id: number
  };
  permissions?: [{
    id: number,
    name: string,
    description: string,
    active: number
  }],
  permissionGroup?: [{
    id: number,
    groupId: number,
    permissionId: number,
    actions: string,
    permission: string
  }];
  permissionUser?: [{
    id: number,
    userId: number,
    permissionsId: number,
    actions: string,
    permission: string,
  }];
  userInformation?: {
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    image: string,
    email: string,
    phone: string,
  }
}
