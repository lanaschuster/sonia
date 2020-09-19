import LocalStrategy from 'passport-local'
import { User } from '../../entities/User'
import { getConnection } from 'typeorm'

const initPassport = (passport) => {
  const authenticateUser = async (username, password, done) => {
    const UserRepository = getConnection('sonia').getRepository(User)
    const result = await UserRepository.findOne({ username })
    if (!result) {
      return done(null, false, {message: 'Usuário não existe.'})
    }

    result.checkPassword(password, result.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          result.password = undefined
          return done(null, result)
        } else {
          return done(null, false, {message: 'Usuário ou Senha incorretos.'})
        }
      })
  }

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, authenticateUser))

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    const UserRepository = getConnection('sonia').getRepository(User)
    const user = await UserRepository.findOne({ id })
    user.password = undefined
    return done(null, user)
  })
}

export { initPassport }
