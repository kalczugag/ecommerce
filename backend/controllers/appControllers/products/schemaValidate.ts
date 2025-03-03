import Joi from "joi";

const schema = Joi.object({
    sku: Joi.string().required(),
    imageUrl: Joi.array().items(Joi.string()).required(),
    brand: Joi.string().min(2).required(),
    title: Joi.string().min(2).required(),
    color: Joi.string().required(),
    discountedPrice: Joi.number().positive().optional(),
    price: Joi.number().positive().required(),
    discountPercent: Joi.number().min(0).max(100).optional(),
    size: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().required(),
                quantity: Joi.number().integer().positive().required(),
            })
        )
        .required(),
    quantity: Joi.number().integer().positive().optional(),
    topLevelCategory: Joi.string().required(),
    secondLevelCategory: Joi.string().required(),
    thirdLevelCategory: Joi.string().required(),
    description: Joi.string().min(10).optional(),
});

export default schema;
