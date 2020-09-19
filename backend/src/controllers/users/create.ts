import { getConnection } from 'typeorm'
import { User } from '../../entities/User'

const create = async (req, res) => {
  const UserRepository = getConnection('sonia').getRepository(User)
  const user = UserRepository.create(req.body)
  await UserRepository.save(user)
  return res.status(201).json(user)
}

export { create }