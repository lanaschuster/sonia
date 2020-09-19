import jwt from 'jsonwebtoken'

const login = async (req, res) => {

  const token = jwt.sign({ id: req.user.id }, 
    '__s0ni4_s3ss10n', 
    { expiresIn: 3600 }
  )
  
  return res.status(200).send({ access_token: token })
}

export { login }
