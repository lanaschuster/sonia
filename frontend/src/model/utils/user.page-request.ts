export class UserPageRequest {
  filter!: string
  page!: number
  size!: number
  sort!: string
  direction!: string

  constructor() {
    this.filter = ''
    this.direction = 'ASC'
    this.size = 10
    this.page = 0
    this.sort = 'name'
  }
}
