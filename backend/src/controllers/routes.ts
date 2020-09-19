import { userRouter } from './users/index' 
import { productRouter } from './products/index' 

const routes = (app, passport) => {
  app.use('/api/users', userRouter)
  app.use('/api/products', productRouter)
}

export { routes }
