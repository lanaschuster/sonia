import { Router } from 'express'
import { list } from './list'
import { create } from './create'
import { findById } from './findById'
// import { update } from './update'
// import { remove } from './remove'
const purchaseRequestRouter = Router()

purchaseRequestRouter.get('/', list)
purchaseRequestRouter.get('/:id', findById)
purchaseRequestRouter.post('/', create)
// purchaseRequestRouter.put('/:id', update)
// purchaseRequestRouter.delete('/:id', remove)

export { purchaseRequestRouter }
