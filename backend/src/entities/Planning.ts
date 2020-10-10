import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm'
import { Department } from './Department'
import { Product } from './Product'

@Entity({
  schema: 'shopping'
})
export class Planning {
  
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

  @Column({
    nullable: true
  })
  description: string
  @Column()
  code: string
  @Column()
  requesterName: string
  @Column()
  budget: number

  @ManyToOne(type => Department, department => department.plannings)
  department: Department

  @JoinTable()
  @ManyToMany(type => Product, product => product.plannings)
  products: Product[];
}
