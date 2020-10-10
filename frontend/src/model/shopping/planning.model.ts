import { User } from '../administration/user.model'
import { BaseClass } from '../base-class'
import { Department } from '../registration/department.model'
import { Product } from '../registration/product.model'

export class Planning extends BaseClass {
  createdAt!: Date
  updatedAt!: Date
  purchaseDate!: Date
  description !: string
  code!: string
  budget!: number
  department!: Department
  requester!: User

  constructor () {
    super()
    this.requester = new User()
    this.department = new Department()
  }
}
