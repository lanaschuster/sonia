import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Permission } from './Permission'
import { User } from './User'

@Entity({
  schema: 'administration'
})
export class Authorization {
  
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => User, user => user.permissions)
  user: User

  @Column({
    type: "enum",
    enum: Permission,
    default: Permission.USER
  })
  permission: Permission
}
