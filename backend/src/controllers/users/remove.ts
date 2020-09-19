import { getConnection } from 'typeorm'
import { User } from '../../entities/User'

const remove = async (req, res) => {
  const UserRepository = getConnection('sonia').getRepository(User)
  const results = await UserRepository.findByIds(req.params.id)

  if (results.length <= 0) {
    return res.status(404).json({
      messagem: 'Usuário não existe'
    })
  }

  await UserRepository.delete(req.params.id)
  return res.status(204).send()
}

export { remove }
