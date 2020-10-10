import { User } from '../../entities/User'
import { getConnection } from 'typeorm'
import bcrypt from 'bcrypt'

const initialTask = async () => {

  const UserRepository = getConnection('sonia').getRepository(User)
  
  const user = UserRepository.create({
    username: 'admin',
    password: bcrypt.hashSync('admin', bcrypt.genSaltSync(7)),
    name: 'Administrador',
    email: 'lanaschuster1@gmail.com',
    isActive: true
  })

  await UserRepository.save(user)
}

export { initialTask }