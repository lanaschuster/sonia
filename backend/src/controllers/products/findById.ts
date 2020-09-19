import { getConnection, Like } from 'typeorm'
import { Product } from '../../entities/Product'

const findById = async (req, res) => {
  const ProductRepository = getConnection('sonia').getRepository(Product)
  const results = await ProductRepository.findByIds(req.params.id)
  
  if (results.length <= 0) {
    return res.status(404).json({
      messagem: 'Produto não existe'
    })
  }
  
  const product = results[0]
  return res.status(200).json(product)
}

export { findById }
