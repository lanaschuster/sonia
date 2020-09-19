import Joi from 'joi'

const validator = Joi.object().keys({
  name: Joi.string().alphanum().required(),
  code: Joi.string().alphanum().required(),
  description: Joi.string().optional(),
  type: Joi.string().required()
})

export { validator }