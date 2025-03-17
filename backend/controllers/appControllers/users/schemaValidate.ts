import Joi from "joi";

const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    birthday: Joi.date().iso().optional(),
    locale: Joi.any().optional(),
    _role: Joi.string().hex().length(24).optional(),
    address: Joi.object({
        street: Joi.string().min(2).optional(),
        city: Joi.string().min(2).optional(),
        state: Joi.string().min(2).optional(),
        postalCode: Joi.string().min(2).optional(),
        country: Joi.string().min(2).optional(),
    }).optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export default schema;
