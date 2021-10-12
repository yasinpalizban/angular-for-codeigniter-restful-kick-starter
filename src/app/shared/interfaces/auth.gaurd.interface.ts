export interface IRoleGuard {
  name: string,
  id: number
}

export interface IPermissionGuard {
  id: number,
  name: string,
  description: string,
  active: number
}

export interface IPermissionGroupGuard {
  id: number,
  groupId: number,
  permissionId: number,
  actions: string,
  permission: string
}

export interface IPermissionUserGuard {
  id: number,
  userId: number,
  permissionsId: number,
  actions: string,
  permission: string,
}
