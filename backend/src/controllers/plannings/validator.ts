import Joi from 'joi'

const validator = Joi.object().keys({
  code: Joi.string().alphanum().optional(),
  category: Joi.string().required(),
  description: Joi.string().optional(),
  budget: Joi.number().required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
  purchaseDate: Joi.date().required(),
  department: Joi.object().required(),
  requester: Joi.object().required()
})

export { validator }