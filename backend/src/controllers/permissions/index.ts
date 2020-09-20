import { Router } from 'express'
import { create } from './create'
import { remove } from './remove'
const permissionRouter = Router()

permissionRouter.post('/', create)
permissionRouter.delete('/:id', remove)

export { permissionRouter }
