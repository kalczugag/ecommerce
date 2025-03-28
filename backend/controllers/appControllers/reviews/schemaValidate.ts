import Joi from "joi";

const schema = Joi.object({
    _product: Joi.string().required(),
    value: Joi.number().required(),
    message: Joi.string().max(500).optional(),
});

export default schema;
