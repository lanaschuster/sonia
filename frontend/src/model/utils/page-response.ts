export class PageResponse<T> {
  content!: T[]
  totalPages!: number
  totalItems!: number
  last!: boolean
  size!: number
  number!: number
}
