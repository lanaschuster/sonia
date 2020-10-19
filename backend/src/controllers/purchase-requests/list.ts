import { getConnection, Like } from 'typeorm'
import { PurchaseRequest } from '../../entities/PurchaseRequest'

const list = async (req, res) => {
  const PurchaseRequestRepository = getConnection('sonia').getRepository(PurchaseRequest)

  let { filter, page, size, sort, direction } = req.query
  const limit = size ? +size : 5
  const offset = page ? page * limit : 0
  sort = sort ? sort : 'code'
  direction = direction ? direction : 'ASC'
  let condition = undefined

  if (filter && filter !== ''){
    condition = [
      {code: Like(`%${filter}%`)},
      {description: Like(`%${filter}%`)},
      {category: Like(`%${filter}%`)},
      {title: Like(`%${filter}%`)}
    ]
  }

  const [purchaseRequests, total] = await PurchaseRequestRepository.findAndCount({
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
    content: purchaseRequests
  })
}

export { list }