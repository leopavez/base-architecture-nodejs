const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  status: Joi.string().required().default('active'),
  country: Joi.string().required(),
  email_verified: Joi.boolean().required().default(false),
  user_type: Joi.string().required(),
  contact: Joi.object({
    phone: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    region: Joi.string().required(),
  }),
});

module.exports = { userSchema };
