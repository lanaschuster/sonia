import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
  @Column({
    type: "enum",
    enum: ProductType,
    default: ProductType.PRODUCT
  })
  type: ProductType
}
