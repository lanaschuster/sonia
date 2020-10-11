import Joi from 'joi'

const validator = Joi.object().keys({
  name: Joi.string().alphanum().required(),
  code: Joi.string().required(),
  description: Joi.string().optional(),
  type: Joi.string().required(),
  category: Joi.string().required()
})

export { validator }