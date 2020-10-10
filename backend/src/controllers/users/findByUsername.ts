import { getConnection } from 'typeorm'
import { User } from '../../entities/User'

const findByUsername = async (req, res) => {
  const UserRepository = getConnection('sonia').getRepository(User)
  const user = await UserRepository.findOne({
    where: { username: req.params.username },
    relations: ['workers', 'workers.department']
  })
  
  if (!user) {
    return res.status(404).json({
      message: 'Usuário não existe'
    })
  }
  
  user.password = undefined
  return res.status(200).json(user)
}

export { findByUsername }
