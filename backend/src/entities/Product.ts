import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Planning } from './Planning'

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

  @ManyToMany(type => Planning, planning => planning.products)
  plannings: Planning[];
}
