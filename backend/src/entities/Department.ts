import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Worker } from './Worker'

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
}
