import { userRouter } from './users/index' 
import { productRouter } from './products/index' 
import { authRouter } from './auth/index' 
import { sessionRouter } from './session/index' 

const routes = (app) => {
  app.use('/api/users', userRouter)
  app.use('/api/products', productRouter)
  app.use('/auth', authRouter)
  app.use('/api/me', sessionRouter)
}

export { routes }
