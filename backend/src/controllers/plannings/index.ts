import { Router } from 'express'
import { list } from './list'
import { create } from './create'
import { findById } from './findById'
import { findByCode } from './findByCode'
import { update } from './update'
import { remove } from './remove'
const planningRouter = Router()

planningRouter.get('/', list)
planningRouter.get('/:id', findById)
planningRouter.get('/:code/code', findByCode)
planningRouter.post('/', create)
planningRouter.put('/:id', update)
planningRouter.delete('/:id', remove)

export { planningRouter }
