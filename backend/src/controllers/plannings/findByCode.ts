import { getConnection, Like } from 'typeorm'
import { Planning } from '../../entities/Planning'

const findByCode = async (req, res) => {
  const PlanningRepository = getConnection('sonia').getRepository(Planning)
  const planning = await PlanningRepository.findOne({ code: req.params.code })
  
  if (!planning) {
    return res.status(404).json({
      messagem: 'Planejamento não existe'
    })
  }
  
  return res.status(200).json(planning)
}

export { findByCode }
