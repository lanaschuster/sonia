import { getConnection } from 'typeorm'
import { User } from '../../entities/User'

const findById = async (req, res) => {
  const UserRepository = getConnection('sonia').getRepository(User)
  const user = await UserRepository.findOne({
    where: {
      id: req.params.id
    },
    relations: ['permissions']
  })
  
  if (!user) {
    return res.status(404).json({
      message: 'Usuário não existe'
    })
  }
  
  user.password = undefined
  let permissions = []
  user.permissions.forEach(permission => {
    permissions.push(permission.permission)
  })

  user.permissions = permissions
  return res.status(200).json(user)
}

export { findById }
