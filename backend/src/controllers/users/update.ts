import { getConnection } from 'typeorm'
import { User } from '../../entities/User'

const update = async (req, res) => {
  const UserRepository = getConnection('sonia').getRepository(User)
  const user = UserRepository.create(req.body)
  
  if (user.password)
    user.password = user.encodePassword(user.password)

  await UserRepository.update(req.params.id, user)
  return res.status(204).send()
}

export { update }
