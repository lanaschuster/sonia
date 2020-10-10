import { BaseClass } from '../base-class'
import { Permission } from './permission.model'

export class User extends BaseClass {
  name!: string
  email!: string
  username!: string
  password!: string
  isActive!: boolean
  confirmPassword!: string
  permissions!: Permission[]
  
  constructor() {
    super()
    this.isActive = true
    this.permissions = []
  }
}
