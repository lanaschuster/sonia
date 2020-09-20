import { Router } from 'express'
import { findByDepartment } from './findByDepartment'
import { findByUser } from './findByUser'
import { findById } from './findById'
import { create } from './create'
import { remove } from './remove'
const workerRouter = Router()

workerRouter.get('/:id', findById)
workerRouter.get('/:id/department', findByDepartment)
workerRouter.get('/:id/user', findByUser)
workerRouter.post('/', create)
workerRouter.delete('/:id', remove)

export { workerRouter }
