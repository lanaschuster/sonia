import { getConnection } from 'typeorm'
import { Worker } from '../../entities/Worker'

const remove = async (req, res) => {
  const WorkerRepository = getConnection('sonia').getRepository(Worker)
  const worker = await WorkerRepository.findOne({ id: req.params.id })
  console.log(worker)
  if (!worker) {
    return res.status(204).send()
  }
  
  await WorkerRepository.delete(req.params.id)
  return res.status(204).send()
}


export { remove }
