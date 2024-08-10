import Joi from "joi";

const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    gender: Joi.string().valid("male", "female").required(),
    birthday: Joi.date().iso().optional(),
    address: Joi.string().min(2).optional(),
    city: Joi.string().min(2).optional(),
    state: Joi.string().min(2).optional(),
    postalCode: Joi.number().integer().positive().optional(),
    country: Joi.string().min(2).optional(),
    phone: Joi.string().min(2).optional(),
    email: Joi.string().email().required(),
});

export default schema;
