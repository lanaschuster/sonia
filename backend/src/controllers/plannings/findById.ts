import { getConnection, Like } from 'typeorm'
import { Planning } from '../../entities/Planning'

const findById = async (req, res) => {
  const PlanningRepository = getConnection('sonia').getRepository(Planning)
  const planning = await PlanningRepository.findOne({
    where: { id: req.params.id },
    relations: ['department', 'requester']
  })
  
  if (!planning) {
    return res.status(404).json({
      message: 'Planejamento não existe'
    })
  }
  
  return res.status(200).json(planning)
}

export { findById }
