import bcrypt from 'bcrypt'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Authorization } from './Authorization'
import { Planning } from './Planning'
import { Worker } from './Worker'
import { PurchaseRequest } from './PurchaseRequest'

@Entity({
  schema: 'administration'
})
export class User {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
  @Column()
  username: string
  @Column()
  password: string
  @Column()
  email: string
  @Column()
  isActive: boolean
  @Column({
    nullable: true
  })
  passwordResetToken: string
  @Column({
    nullable: true
  })
  passwordResetExpires: Date

  @OneToMany(type => Authorization, authorization => authorization.user)
  permissions: Authorization[]

  @OneToMany(type => Worker, worker => worker.user)
  workers: Worker[]

  @OneToMany(type => Planning, planning => planning.requester)
  plannings: Planning[]
  
  @OneToMany(type => PurchaseRequest, purchaseRequest => purchaseRequest.requester)
  purchaseRequests: PurchaseRequest[]

  public encodePassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(7))
  }

  public checkPassword(password, hash, callback) {
    return bcrypt.compare(password, hash, callback)
  }
}
