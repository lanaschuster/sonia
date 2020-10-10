import { BaseClass } from '../base-class'
import { PermissionType } from './permission.enum'

export class Permission extends BaseClass {
  permission!: PermissionType

  constructor() {
    super()
    this.permission = PermissionType.USER
  }
}
