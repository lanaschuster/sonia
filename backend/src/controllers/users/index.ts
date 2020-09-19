import { Router } from 'express'
import { list } from './list'
import { create } from './create'
import { findById } from './findById'
import { update } from './update'
import { remove } from './remove'
const userRouter = Router()

userRouter.get('/', list)
userRouter.get('/:id', findById)
userRouter.post('/', create)
userRouter.put('/:id', update)
userRouter.delete('/:id', remove)

export { userRouter }
