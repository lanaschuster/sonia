import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Planning } from './Planning'
import { Worker } from './Worker'
import { PurchaseRequest } from './PurchaseRequest'

@Entity({
  schema: 'registration'
})
export class Department {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
  @Column()
  code: string

  @OneToMany(type => Worker, worker => worker.department)
  workers: Worker[]

  @OneToMany(type => Planning, planning => planning.department)
  plannings: Planning[]

  @OneToMany(type => PurchaseRequest, request => request.departments)
  purchaseRequests: PurchaseRequest[]
}
