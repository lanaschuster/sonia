import { BaseClass } from '../base-class'
import { Department } from '../registration/department.model'
import { Product } from '../registration/product.model'

export class Planning extends BaseClass {
  createdAt!: Date
  updatedAt!: Date
  purchaseDate!: Date
  description !: string
  code!: string
  requesterName!: string
  budget!: number
  department!: Department
  products!: Product[]

  constructor () {
    super()
    this.products = []
    this.department = new Department()
  }
}
