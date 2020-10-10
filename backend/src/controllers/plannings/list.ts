import { getConnection, Like } from 'typeorm'
import { Planning } from '../../entities/Planning'

const list = async (req, res) => {
  const PlanningRepository = getConnection('sonia').getRepository(Planning)

  let { filter, page, size, sort, direction } = req.query
  const limit = size ? +size : 5
  const offset = page ? page * limit : 0
  sort = sort ? sort : 'createdAt'
  direction = direction ? direction : 'ASC'
  let condition = undefined

  if (filter && filter !== ''){
    condition = [
      {code: Like(`%${filter}%`)}, 
      {description: Like(`%${filter}%`)},
      {requesterName: Like(`%${filter}%`)}
    ]
  }

  const [plannings, total] = await PlanningRepository.findAndCount({
    where: condition,
    take: limit,
    skip: offset
  })

  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    currentPage,
    totalPages,
    totalItems: total,
    content: plannings
  })
}

export { list }