import Joi from 'joi'

const validator = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  name: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  passwordResetToken: Joi.string().alphanum().optional(),
  passwordResetExpires: Joi.date().optional(),
  permissions: Joi.array().required()
})

export { validator }