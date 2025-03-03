import Joi from "joi";

const schema = Joi.object({
    _product: Joi.string().optional(),
    name: Joi.string().min(2).optional(),
    color: Joi.string().optional(),
    size: Joi.string().required(),
    unitPrice: Joi.number().min(0).required(),
    quantity: Joi.number().integer().min(1).required(),
    total: Joi.number().min(0).optional(),
});

export default schema;
