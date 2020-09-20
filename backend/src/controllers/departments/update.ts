import { getConnection } from 'typeorm'
import { Department } from '../../entities/Department'

const update = async (req, res) => {
  const DepartmentRepository = getConnection('sonia').getRepository(Department)
  req.body.workers = undefined
  const department = DepartmentRepository.create(req.body)

  await DepartmentRepository.update(req.params.id, department)
  return res.status(204).send()
}

export { update }
