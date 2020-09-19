import { BaseClass } from '../base-class'

export class User extends BaseClass {
  name!: string
  email!: string
  username!: string
  password!: string
  isActive!: boolean
  confirmPassword!: string

  constructor() {
    super()
    this.isActive = true
  }
}
