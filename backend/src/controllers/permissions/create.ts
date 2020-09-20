import { getConnection } from 'typeorm'
import { User } from '../../entities/User'
import { Authorization } from '../../entities/Authorization'

const create = async (req, res) => {
  const UserRepository = getConnection('sonia').getRepository(User)
  const AuthorizationRepository = getConnection('sonia').getRepository(Authorization)
  
  const user = await UserRepository.findOne({ id: req.params.id })
  const authorization = AuthorizationRepository.create({ permission: req.body.permission, user })
  await AuthorizationRepository.save(authorization)

  return res.status(201).send()
}


export { create }
