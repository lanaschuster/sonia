import { getConnection } from 'typeorm'
import { Planning } from '../../entities/Planning'
import { validator } from './validator'
import { v4 as uuidv4 } from 'uuid';

const create = async (req, res) => {
  const PlanningRepository = getConnection('sonia').getRepository(Planning)
  
  const planning = PlanningRepository.create(req.body)
  const result = validator.validate(planning)
  
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message
    })
  }

  planning.createdAt = new Date()
  planning.code = uuidv4()

  await PlanningRepository.save(planning)
  return res.status(201).json(planning)
}

export { create }
