import { BaseClass } from '../base-class'

export class User extends BaseClass {
  name!: string
  email!: string
  username!: string
  password!: string
  is_active!: boolean
  confirmPassword!: string

  constructor() {
    super()
    this.is_active = true
  }
}
