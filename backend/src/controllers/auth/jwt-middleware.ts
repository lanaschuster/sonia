import jwt from 'jsonwebtoken'

const jwtMiddleware = (req, res, next) => {
  const header = req.headers.authorization
  
  if (!header) {
    return res.status(401).json({
      message: 'No token provided'
    })
  }
  
  const parts = header.split(' ')
  if (parts.length !== 2) {
    return res.status(401).json({
      message: 'Token error'
    })
  }
  
  const [ scheme, token ] = parts
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({
      message: 'Token malformatted'
    })
  }
  
  jwt.verify(token, '__s0ni4_s3ss10n', (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: 'Invalid token'
      })
    }
    
    // req.userId = decoded.id
    return next()
  })
}

export { jwtMiddleware }
