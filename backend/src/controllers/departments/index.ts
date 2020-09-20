import { Router } from 'express'
import { list } from './list'
import { create } from './create'
import { findById } from './findById'
import { update } from './update'
import { remove } from './remove'
const departmentRouter = Router()

departmentRouter.get('/', list)
departmentRouter.get('/:id', findById)
departmentRouter.post('/', create)
departmentRouter.put('/:id', update)
departmentRouter.delete('/:id', remove)

export { departmentRouter }
