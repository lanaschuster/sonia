import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm'
import { PurchaseItem } from './PurchaseItem'

enum ProductType {
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE'
}

@Entity({
  schema: 'registration'
})
export class Product {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
  @Column()
  code: string
  @Column()
  description: string
  @Column()
  category: string
  @Column({
    type: "enum",
    enum: ProductType,
    default: ProductType.PRODUCT
  })
  type: ProductType

  @OneToMany(type => PurchaseItem, purchaseItem => purchaseItem.product)
  purchaseItems: PurchaseItem[]
}
