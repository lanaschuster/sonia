import { getConnection } from 'typeorm'
import { User } from '../../entities/User'
import { validator } from './validator'
import { createAuthorizations } from '../permissions/authorizations'

const create = async (req, res) => {
  const UserRepository = getConnection('sonia').getRepository(User)
  
  const user = UserRepository.create(req.body)
  const result = validator.validate(user)
  
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message
    })
  }

  const found = await UserRepository
    .query(`select * from administration.user u where u.username = '${user.username}' or u.email = '${user.email}';`)
    
  if (found.length > 0) {
    return res.status(400).json({
      message: 'username ou email já cadastrado'
    })
  }

  user.password = user.encodePassword(user.password)
  await UserRepository.save(user)
  createAuthorizations(user.permissions, user)

  user.password = undefined
  return res.status(201).json(user)
}


export { create }
