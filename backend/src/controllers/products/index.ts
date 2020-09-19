import { Router } from 'express'
import { list } from './list'
import { create } from './create'
import { findById } from './findById'
import { update } from './update'
import { remove } from './remove'
const productRouter = Router()

productRouter.get('/', list)
productRouter.get('/:id', findById)
productRouter.post('/', create)
productRouter.put('/:id', update)
productRouter.delete('/:id', remove)

export { productRouter }
