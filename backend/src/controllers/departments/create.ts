import { getConnection } from 'typeorm'
import { Department } from '../../entities/Department'
import { Worker } from '../../entities/Worker'
import { validator } from './validator'

const create = async (req, res) => {
  const DepartmentRepository = getConnection('sonia').getRepository(Department)
  
  const department = DepartmentRepository.create(req.body)
  const result = validator.validate(department)
  
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message
    })
  }

  const found = await DepartmentRepository.findOne({ code: department.code })
    
  if (found) {
    return res.status(400).json({
      message: 'Código do departmento já cadastrado'
    })
  }

  await DepartmentRepository.save(department)
  createWorkers(department)

  return res.status(201).json(department)
}

function createWorkers (department) {
  const WorkerRepository = getConnection('sonia').getRepository(Worker)

  department.workers.forEach(async worker => {
    let _worker = WorkerRepository.create({user: worker.user, department: department, isManager: worker.isManager, isSubstitute: worker.isSubstitute})
    await WorkerRepository.save(_worker)
  })
}

export { create }
