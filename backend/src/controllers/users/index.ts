import { Router } from 'express'
import { list } from './list'
import { create } from './create'
import { findById } from './findById'
const userRouter = Router()

userRouter.get('/', list)
userRouter.get('/:id', findById)
userRouter.post('/', create)
// router.delete('/:id', require('./remove'))

export { userRouter }