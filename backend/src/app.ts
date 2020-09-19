import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import flash from "express-flash"
import session from "express-session"
import cors from 'cors'

import { routes } from './controllers/routes'

import { initPassport } from './infrastructure/passport/index'
initPassport(passport)

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(flash())
app.use(cors())


app.use(
  session({
    secret: '__s0ni4_s3ss10n',
    resave: true,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

routes(app)

export { app }
