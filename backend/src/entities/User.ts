import bcrypt from 'bcrypt'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { Authorization } from './Authorization'

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

  public encodePassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(7))
  }

  public checkPassword(password, hash, callback) {
    return bcrypt.compare(password, hash, callback)
  }
}