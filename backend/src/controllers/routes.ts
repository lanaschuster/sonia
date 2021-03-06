import { userRouter } from './users/index' 
import { productRouter } from './products/index' 
import { authRouter } from './auth/index' 
import { sessionRouter } from './session/index' 
import { permissionRouter } from './permissions/index' 
import { departmentRouter } from './departments/index' 
import { workerRouter } from './workers/index' 
import { planningRouter } from './plannings/index' 
import { purchaseRequestRouter } from './purchase-requests/index' 
import { jwtMiddleware } from '../controllers/auth/jwt-middleware'

const routes = (app) => {
  app.use('/auth', authRouter)
  app.use('/api/users', jwtMiddleware, userRouter)
  app.use('/api/products', jwtMiddleware, productRouter)
  app.use('/api/me', jwtMiddleware, sessionRouter)
  app.use('/api/permissions', jwtMiddleware, permissionRouter)
  app.use('/api/departments', jwtMiddleware, departmentRouter)
  app.use('/api/workers', jwtMiddleware, workerRouter)
  app.use('/api/plannings', planningRouter)
  app.use('/api/purchase-requests', purchaseRequestRouter)
}

export { routes }
