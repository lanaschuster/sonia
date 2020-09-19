import { userRouter } from './users/index' 
import { productRouter } from './products/index' 

const routes = (app, passport) => {
  app.use('/users', userRouter)
  app.use('/products', productRouter)
}

export { routes }
