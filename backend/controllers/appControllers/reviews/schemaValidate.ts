import Joi from "joi";

const schema = Joi.object({
    _product: Joi.string().required(),
    _order: Joi.string().required(),
    value: Joi.number().required(),
    pros: Joi.array().items(Joi.string()).optional(),
    cons: Joi.array().items(Joi.string()).optional(),
    message: Joi.string().max(500).optional(),
});

export default schema;
