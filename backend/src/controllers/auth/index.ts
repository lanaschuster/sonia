import { Router } from 'express'
import passport from 'passport'
import { login } from './login'
import { checkToken } from './check-token'
const authRouter = Router()

authRouter.post('/login', passport.authenticate("local-login"), login)

authRouter.post('/check-token',  checkToken)


export { authRouter }
