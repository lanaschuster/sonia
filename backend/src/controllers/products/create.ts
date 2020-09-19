import { getConnection } from 'typeorm'
import { Product } from '../../entities/Product'
import { validator } from './validator'

const create = async (req, res) => {
  const ProductRepository = getConnection('sonia').getRepository(Product)
  
  const product = ProductRepository.create(req.body)
  const result = validator.validate(product)
  
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message
    })
  }

  const found = await ProductRepository
    .query(`select * from registration.product u where u.code = '${product.code}'`)
    
  
  if (found.length > 0) {
    return res.status(400).json({
      message: 'Código do produto já cadastrado'
    })
  }

  await ProductRepository.save(product)
  return res.status(201).json(product)
}

export { create }
