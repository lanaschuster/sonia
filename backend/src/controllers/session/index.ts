import { Router } from 'express'
const sessionRouter = Router()

sessionRouter.get('/', (req, res) => {
  const user = req.user
  if (!user) {
    return res.status(500).json({
      error: 'something went wrong with the user session.'
    })
  }

  return res.status(200).json(user)
})


export { sessionRouter }
