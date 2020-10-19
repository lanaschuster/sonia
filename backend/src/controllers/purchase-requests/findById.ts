import { getConnection, Like } from 'typeorm'
import { PurchaseRequest } from '../../entities/PurchaseRequest'

const findById = async (req, res) => {
  const PurchaseRequestRepository = getConnection('sonia').getRepository(PurchaseRequest)
  const requests = await PurchaseRequestRepository.findOne({ id: req.params.id })
  
  if (!requests) {
    return res.status(404).json({
      message: 'Solicitação de compra não existe'
    })
  }
  
  return res.status(200).json(requests)
}

export { findById }
