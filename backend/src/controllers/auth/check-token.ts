import jwt from 'jsonwebtoken'

const checkToken = async (req, res) => {
  const { token } = req.body

  jwt.verify(token, '__s0ni4_s3ss10n', (error, _) => {
    if (error) {
      return res.status(401).json({
        message: 'Token inválido'
      })
    }

    return res.status(200).send()
  })
}

export { checkToken }
