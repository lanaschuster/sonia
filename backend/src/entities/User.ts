import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import bcrypt from 'bcrypt'

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

  public encodePassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(7))
  }

  public checkPassword(password, hash, callback) {
    return bcrypt.compare(password, hash, callback)
  }
}