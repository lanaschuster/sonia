import { getConnection, Like } from 'typeorm'
import { User } from '../../entities/User'

const findById = async (req, res) => {
  const UserRepository = getConnection('sonia').getRepository(User)
  const results = await UserRepository.findByIds(req.params.id)
  
  if (results.length <= 0) {
    return res.status(404).json({
      messagem: 'Usuário não existe'
    })
  }
  
  const user = results[0]
  user.password = undefined
  return res.status(200).json(user)
}

export { findById }
