import { Router } from 'express'
import passport from 'passport'
import { login } from './login'
// import { create } from './create'
// import { findById } from './findById'
// import { update } from './update'
// import { remove } from './remove'
const authRouter = Router()

authRouter.post('/login', passport.authenticate("local-login"), login)

// router.post('/check-token', AuthController.checkToken)
// router.post('/forgot-password', AuthController.forgotPassword)
// router.post('/reset-password', AuthController.resetPassword)


export { authRouter }
