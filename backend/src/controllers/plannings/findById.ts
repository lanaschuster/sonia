import { getConnection, Like } from 'typeorm'
import { Planning } from '../../entities/Planning'

const findById = async (req, res) => {
  const PlanningRepository = getConnection('sonia').getRepository(Planning)
  const results = await PlanningRepository.findByIds(req.params.id)
  
  if (results.length <= 0) {
    return res.status(404).json({
      messagem: 'Planejamento não existe'
    })
  }
  
  const planning = results[0]
  return res.status(200).json(planning)
}

export { findById }
