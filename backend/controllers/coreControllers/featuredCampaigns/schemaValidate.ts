import Joi from "joi";

const colorSchema = Joi.object({
    primary: Joi.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/),
    secondary: Joi.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/),
});

const schema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(10).optional(),
    _category: Joi.string().optional(),
    imageUrl: Joi.string().uri().optional(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    discount: Joi.number().min(0).max(100).required(),
    promoCode: Joi.string().optional(),
    image: Joi.string().uri().optional(),
    products: Joi.array().items(Joi.string()).optional(),
    textColor: colorSchema.optional(),
    bgColor: colorSchema.optional(),
    hidden: Joi.boolean().optional(),
});

export default schema;
