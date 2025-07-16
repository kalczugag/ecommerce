import Joi from "joi";

export const userAddressSchema = Joi.object({
    street1: Joi.string().min(2).required(),
    street2: Joi.string().min(2).optional(),
    city: Joi.string().min(2).required(),
    region: Joi.string().min(2).required(),
    postalCode: Joi.string().min(2).required(),
    country: Joi.object({
        code: Joi.string().required(),
        label: Joi.string().required(),
        phone: Joi.string().required(),
    }),
    raw: Joi.string().optional(),
}).optional();

const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthday: Joi.date().iso().optional(),
    locale: Joi.any().optional(),
    imageId: Joi.string().optional(),
    _role: Joi.string().hex().length(24).optional(),
    address: userAddressSchema,
    phone: Joi.object({
        countryCallingCode: Joi.string().required(),
        nationalNumber: Joi.string().required(),
        extension: Joi.string().optional(),
    }).optional(),
    email: Joi.string().email().required(),
});

export default schema;
