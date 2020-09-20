import { getConnection } from 'typeorm'
import { Department } from '../../entities/Department'
import { Worker } from '../../entities/Worker'

const remove = async (req, res) => {
  const DepartmentRepository = getConnection('sonia').getRepository(Department)
  const WorkerRepository = getConnection('sonia').getRepository(Worker)
  const result = await DepartmentRepository.findOne({ id: req.params.id })

  if (!result) {
    return res.status(404).json({
      messagem: 'Departamento não existe'
    })
  }
  
  const workers = await WorkerRepository.query(`select w.id from registration.worker w where w.\"departmentId\" = ${result.id}`)
  workers.forEach(async worker => {
    await WorkerRepository.delete(worker.id)
  })

  await DepartmentRepository.delete(req.params.id)
  return res.status(204).send()
}

export { remove }
