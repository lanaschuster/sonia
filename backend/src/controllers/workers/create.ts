import { getConnection } from 'typeorm'
import { Worker } from '../../entities/Worker'

const create = async (req, res) => {
  const WorkerRepository = getConnection('sonia').getRepository(Worker)
  
  const worker = WorkerRepository.create(req.body)
  await WorkerRepository.save(worker)

  return res.status(201).send()
}


export { create }
