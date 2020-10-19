import Joi from 'joi'

const validator = Joi.object().keys({
  title: Joi.string().required(),
  code: Joi.string().alphanum().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  departments: Joi.array().required(),
  requester: Joi.object().required(),
  planning: Joi.object().optional(),
  purchaseItems: Joi.array().optional()
})

export { validator }