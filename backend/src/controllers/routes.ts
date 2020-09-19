import { userRouter } from './users/index' 

const routes = (app, passport) => {
  app.use('/users', userRouter)
}

export { routes }
