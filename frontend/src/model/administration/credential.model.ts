import { Permission } from './permission.model'

export class Credential {
  username!: string
  password!: string
  email!: string
  permissions!: Permission[]

  constructor() {
    this.permissions = []
  }
}
