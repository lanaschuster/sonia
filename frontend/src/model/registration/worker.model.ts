import { BaseClass } from '../base-class'
import { User } from '../administration/user.model'
import { Department } from './department.model'

export class Worker extends BaseClass {
  isManager!: boolean
  isSubstitute!: boolean
  user!: User
  department !: Department

  constructor() {
    super()
    this.isManager = false
    this.isSubstitute = false
  }
}
