import { getConnection, Like } from 'typeorm'
import { Department } from '../../entities/Department'

const list = async (req, res) => {
  const DepartmentRepository = getConnection('sonia').getRepository(Department)

  let { filter, page, size, sort, direction } = req.query
  const limit = size ? +size : 5
  const offset = page ? page * limit : 0
  sort = sort ? sort : 'name'
  direction = direction ? direction : 'ASC'
  let condition = undefined

  if (filter && filter !== ''){
    condition = [
      {name: Like(`%${filter}%`)}, 
      {code: Like(`%${filter}%`)}
    ]
  }

  const [departments, total] = await DepartmentRepository.findAndCount({
    where: condition,
    take: limit,
    skip: offset,
    order: {
      name: direction
    }
  })

  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    currentPage,
    totalPages,
    totalItems: total,
    content: departments
  })
}

export { list }
