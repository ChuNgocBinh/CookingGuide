const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6)
})

const loginSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(6)
})

module.exports = {
    registerSchema,
    loginSchema
}