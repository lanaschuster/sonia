import { getConnection } from 'typeorm'
import { Product } from '../../entities/Product'

const remove = async (req, res) => {
  const ProductRepository = getConnection('sonia').getRepository(Product)
  const results = await ProductRepository.findByIds(req.params.id)

  if (results.length <= 0) {
    return res.status(404).json({
      messagem: 'Produto não existe'
    })
  }

  await ProductRepository.delete(req.params.id)
  return res.status(204).send()
}

export { remove }
