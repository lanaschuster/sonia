import { getConnection } from 'typeorm'
import { Authorization } from '../../entities/Authorization'

const remove = async (req, res) => {
  const AuthorizationRepository = getConnection('sonia').getRepository(Authorization)
  const results = await AuthorizationRepository.find(req.params.id)

  if (results.length <= 0) {
    return res.status(204).send()
  }
  
  await AuthorizationRepository.delete(req.params.id)
  return res.status(201).send()
}


export { remove }
