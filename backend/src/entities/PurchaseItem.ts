import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'
import { Product } from './Product'
import { PurchaseRequest } from './PurchaseRequest'

@Entity({
  schema: 'shopping'
})
export class PurchaseItem {
  
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  createdAt: Date
  @Column({
    nullable: true
  })
  updatedAt: Date

  @Column()
  quantity: string

  @ManyToOne(type => Product, product => product.purchaseItems)
  product: Product

  @OneToMany(type => PurchaseRequest, request => request.purchaseItems)
  purchaseRequests: PurchaseRequest[]
}
