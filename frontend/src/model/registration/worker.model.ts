import { BaseClass } from '../base-class'
import { User } from '../administration/user.model'
import { Department } from './department.model'

export class Worker extends BaseClass {
  is_manager!: boolean
  is_substitute!: boolean
  user!: User
  department !: Department

  constructor() {
    super()
    this.is_manager = false
    this.is_substitute = false
  }
}
