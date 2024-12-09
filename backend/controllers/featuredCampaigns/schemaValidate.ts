import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(10).optional(),
    _category: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    image: Joi.string().uri().optional(),
    products: Joi.array().items(Joi.string()).required(),
});

export default schema;
