import express from 'express'
import 'reflect-metadata'
import morgan from 'morgan'

import { routes } from './controllers/routes'

const app = express()
app.use(express.json())
app.use(morgan('dev'))

routes(app, undefined)

export { app }
