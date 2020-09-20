import { Router } from 'express'
import { findByDepartment } from './findByDepartment'
// import { create } from './create'
// import { remove } from './remove'
const workerRouter = Router()

workerRouter.get('/:id/department', findByDepartment)
// workerRouter.get('/:id/user', WorkerRepository.findByUserId)
// workerRouter.get('/:id', WorkerRepository.findById)
// workerRouter.post('/', WorkerController.save)
// workerRouter.delete('/:id', WorkerController.delete)

export { workerRouter }
