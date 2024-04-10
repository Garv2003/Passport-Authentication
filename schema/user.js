const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).max(30).required(),
  email: Joi.string().email().required(),
});

module.exports = userSchema;
