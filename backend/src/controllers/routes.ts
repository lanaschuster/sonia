import { userRouter } from './users/index' 
import { productRouter } from './products/index' 
import { authRouter } from './auth/index' 

const routes = (app, passport) => {
  app.use('/api/users', userRouter)
  app.use('/api/products', productRouter)
  app.use('/auth', authRouter)
}

export { routes }
