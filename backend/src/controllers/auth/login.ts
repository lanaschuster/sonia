import jwt from 'jsonwebtoken'

const login = (req, res) => {

  const token = jwt.sign({ id: req.user.id }, 
    '__s0ni4_s3ss10n', 
    { expiresIn: 3600 }
  )
  
  return res.status(200).send({ accessToken: token })
}

export { login }
