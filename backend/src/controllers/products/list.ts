import { getConnection, Like } from 'typeorm'
import { Product } from '../../entities/Product'

const list = async (req, res) => {
  const ProductRepository = getConnection('sonia').getRepository(Product)

  let { filter, page, size, sort, direction } = req.query
  const limit = size ? +size : 5
  const offset = page ? page * limit : 0
  sort = sort ? sort : 'name'
  direction = direction ? direction : 'ASC'
  let condition = undefined

  if (filter && filter !== ''){
    condition = [
      {name: Like(`%${filter}%`)}, 
      {code: Like(`%${filter}%`)},
      {description: Like(`%${filter}%`)}
    ]
  }

  const [products, total] = await ProductRepository.findAndCount({
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
    content: products
  })
}

export { list }