import { Router } from 'express'
import { list } from './list'
const userRouter = Router()

userRouter.get('/', list)
// router.post('/', require('./create'))
// router.delete('/:id', require('./remove'))

export { userRouter }