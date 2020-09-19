import express from 'express'
import { routes } from './controllers/routes'

const app = express()
app.use(express.json())
routes(app, undefined)

export { app }
