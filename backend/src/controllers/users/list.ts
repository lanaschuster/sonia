import { getConnection } from 'typeorm'
import { User } from '../../entities/User'

const list = async (req, res) => {
  const UserRepository = getConnection('sonia').getRepository(User)
  const users = await UserRepository.query('SELECT * FROM administration.user');
  return res.status(200).json(users)
}

export { list }