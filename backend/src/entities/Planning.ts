import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Department } from './Department'
import { User } from './User'

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

  @Column()
  description: string
  @Column()
  code: string
  @Column()
  category: string
  @Column('float')
  budget: number

  @ManyToOne(type => Department, department => department.plannings)
  department: Department

  @ManyToOne(type => User, user => user.plannings)
  requester: User
}
