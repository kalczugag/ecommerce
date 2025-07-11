import Joi from "joi";

const colorSchema = Joi.object({
    primary: Joi.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/),
    secondary: Joi.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/),
});

const schema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(10).max(500).optional(),
    _category: Joi.string().optional(),
    imageUrl: Joi.string().uri().optional(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    discount: Joi.number().min(5).max(100).required(),
    discountType: Joi.string().valid("percentage", "quota").required(),
    minPrice: Joi.number().positive().required(),
    promoCode: Joi.string().optional(),
    image: Joi.string().uri().optional(),
    products: Joi.array().items(Joi.string()).optional(),
    textColor: colorSchema.optional(),
    bgColor: colorSchema.optional(),
    hidden: Joi.boolean().optional(),
    numOfCoupons: Joi.number().integer().min(1).required(),
});

export default schema;
