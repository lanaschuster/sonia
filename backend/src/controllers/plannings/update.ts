import { getConnection } from 'typeorm'
import { Planning } from '../../entities/Planning'

const update = async (req, res) => {
  const PlanningRepository = getConnection('sonia').getRepository(Planning)
  const planning = PlanningRepository.create(req.body)
  
  await PlanningRepository.update(req.params.id, planning)
  return res.status(204).send()
}

export { update }
