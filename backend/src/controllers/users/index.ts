import { Router } from 'express'
import { list } from './list'
import { create } from './create'
const userRouter = Router()

userRouter.get('/', list)
userRouter.post('/', create)
// router.delete('/:id', require('./remove'))

export { userRouter }