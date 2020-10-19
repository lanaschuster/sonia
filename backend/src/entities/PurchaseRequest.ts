import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { Department } from './Department'
import { Planning } from './Planning'
import { PurchaseItem } from './PurchaseItem'
import { User } from './User'

@Entity({
  schema: 'shopping'
})
export class PurchaseRequest {
  
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  createdAt: Date
  @Column({
    nullable: true
  })
  updatedAt: Date
  @Column({
    nullable: true
  })
  purchaseDate: Date

  @Column()
  code: string
  @Column()
  title: string
  @Column()
  category: string
  @Column('text')
  description: string

  @JoinTable()
  @ManyToMany(type => Department, department => department.plannings)
  departments: Department[]

  @ManyToOne(type => User, user => user.purchaseRequests)
  requester: User

  @ManyToOne(type => Planning, planning => planning.purchaseRequests, {
    nullable: true
  })
  planning: Planning

  @JoinTable()
  @ManyToMany(type => PurchaseItem, purchaseItem => purchaseItem.purchaseRequests)
  purchaseItems: PurchaseItem[]
}
