import { getConnection } from 'typeorm'
import { PurchaseRequest } from '../../entities/PurchaseRequest'
import { validator } from './validator'

const create = async (req, res) => {
  const PurchaseRequestRepository = getConnection('sonia').getRepository(PurchaseRequest)
  
  const purchaseRequest = PurchaseRequestRepository.create(req.body)
  const result = validator.validate(purchaseRequest)
  
  if (result.error) {
    console.log(result.error)
    return res.status(400).json({
      message: result.error.details[0].message
    })
  }

  const found = await PurchaseRequestRepository
    .query(`select * from shopping.purchaseRequest u where u.code = '${purchaseRequest.code}'`)
    
  
  if (found.length > 0) {
    return res.status(400).json({
      message: 'Solicitação de compra já cadastrada'
    })
  }

  await PurchaseRequestRepository.save(purchaseRequest)
  return res.status(201).json(purchaseRequest)
}

export { create }
