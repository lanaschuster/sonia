import { Router } from 'express'
import { findByDepartment } from './findByDepartment'
import { findByUser } from './findByUser'
// import { create } from './create'
// import { remove } from './remove'
const workerRouter = Router()

workerRouter.get('/:id/department', findByDepartment)
workerRouter.get('/:id/user', findByUser)
// workerRouter.get('/:id', WorkerRepository.findById)
// workerRouter.post('/', WorkerController.save)
// workerRouter.delete('/:id', WorkerController.delete)

export { workerRouter }
