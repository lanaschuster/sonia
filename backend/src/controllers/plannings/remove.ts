import { getConnection } from 'typeorm'
import { Planning } from '../../entities/Planning'

const remove = async (req, res) => {
  const PlanningRepository = getConnection('sonia').getRepository(Planning)
  const results = await PlanningRepository.findByIds(req.params.id)

  if (results.length <= 0) {
    return res.status(404).json({
      messagem: 'Planejamento não existe'
    })
  }

  await PlanningRepository.delete(req.params.id)
  return res.status(204).send()
}

export { remove }
