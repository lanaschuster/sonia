import { getConnection } from 'typeorm'
import { Product } from '../../entities/Product'

const update = async (req, res) => {
  const ProductRepository = getConnection('sonia').getRepository(Product)
  const product = ProductRepository.create(req.body)
  
  await ProductRepository.update(req.params.id, product)
  return res.status(204).send()
}

export { update }
