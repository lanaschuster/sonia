import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
}