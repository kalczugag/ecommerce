import Joi from "joi";

const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    birthday: Joi.date().iso().optional(),
    address: Joi.object({
        street: Joi.string().min(2).optional(),
        city: Joi.string().min(2).optional(),
        state: Joi.string().min(2).optional(),
        postalCode: Joi.string().min(2).optional(),
        country: Joi.string().min(2).optional(),
    }).optional(),
    phone: Joi.string().min(2).optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export default schema;
