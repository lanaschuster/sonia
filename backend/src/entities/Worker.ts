import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Department } from './Department'
import { User } from './User'

@Entity({
  schema: 'registration'
})
export class Worker {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  isManager: boolean
  @Column()
  isSubstitute: boolean

  @ManyToOne(type => User, user => user.workers)
  user: User

  @ManyToOne(type => Department, department => department.workers)
  department: Department
}
