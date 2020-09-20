import { workers } from 'cluster'
import { getConnection, Like } from 'typeorm'
import { Worker } from '../../entities/Worker'
import { User } from '../../entities/User'
import { Department } from '../../entities/Department'

const findById = async (req, res) => {
  const WorkerRepository = getConnection('sonia').getRepository(Worker)
  const results = await WorkerRepository.query(`select * from registration.worker w where w.id = ${req.params.id};`)

  if (results.length <= 0) {
    return res.status(404).json({
      messagem: 'Funcionário não existe'
    })
  }
  
  const _worker = await populateWorker(results[0])
  return res.status(200).json(_worker)
}

async function populateWorker(worker) {
  const WorkerRepository = getConnection('sonia').getRepository(Worker)
  const UserRepository = getConnection('sonia').getRepository(User)
  const DepartmentRepository = getConnection('sonia').getRepository(Department)

  let user = await UserRepository.findOne({ id: worker.userId })
  user.password = undefined
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined

  let department = await DepartmentRepository.findOne({ id: worker.departmentId })
  return WorkerRepository.create({ user, department, isManager: worker.isManager, isSubstitute: worker.isSubstitute, id: worker.id })
}


export { findById }
