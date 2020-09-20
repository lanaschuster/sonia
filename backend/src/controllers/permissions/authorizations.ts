import { getConnection } from 'typeorm'
import { Authorization } from '../../entities/Authorization'

const createAuthorizations = (permissions, user) => {
  const AuthorizationRepository = getConnection('sonia').getRepository(Authorization)

  permissions.forEach(async permission => {
    let authorization = AuthorizationRepository.create({ permission: permission.permission, user })
    await AuthorizationRepository.save(authorization)
  })
}


export { createAuthorizations }
