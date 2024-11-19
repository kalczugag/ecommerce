import Joi from "joi";

const addressSchema = Joi.object({
    street: Joi.string().optional(),
    apartment: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    postalCode: Joi.string().optional(),
    country: Joi.string().optional(),
});

const schema = Joi.object({
    _cart: Joi.string().hex().length(24).optional(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().hex().length(24).optional(),
    birthday: Joi.date().optional(),
    address: addressSchema.optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().required(),
}).options({ allowUnknown: true });

export default schema;
