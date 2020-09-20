import { BaseClass } from '../base-class'
import { Worker } from './worker.model'

export class Department extends BaseClass {
  name!: string
  code!: string
  workers!: Worker[]

  constructor() {
    super()
    this.workers = []
  }
}
