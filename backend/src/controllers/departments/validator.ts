import Joi from 'joi'

const validator = Joi.object().keys({
  code: Joi.string().required(),
  name: Joi.string().required(),
  workers: Joi.array().optional()
})

export { validator }