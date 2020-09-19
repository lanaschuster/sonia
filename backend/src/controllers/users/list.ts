import { getConnection, Like } from 'typeorm'
import { User } from '../../entities/User'

const list = async (req, res) => {
  const UserRepository = getConnection('sonia').getRepository(User)

  let { filter, page, size, sort, direction } = req.query
  const limit = size ? +size : 5
  const offset = page ? page * limit : 0
  sort = sort ? sort : 'name'
  direction = direction ? direction : 'ASC'
  let condition = undefined

  if (filter && filter !== ''){
    condition = [
      {name: Like(`%${filter}%`)}, 
      {username: Like(`%${filter}%`)},
      {email: Like(`%${filter}%`)}
    ]
  }

  const [users, total] = await UserRepository.findAndCount({
    where: condition,
    take: limit,
    skip: offset,
    order: {
      name: direction
    }
  })

  users.forEach(user => {
    user.password = undefined
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
  })

  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    currentPage,
    totalPages,
    total,
    content: users
  })
}

export { list }