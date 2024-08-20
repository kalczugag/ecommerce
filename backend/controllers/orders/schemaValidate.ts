import Joi from "joi";

const schema = Joi.object({
    _user: Joi.string().required(),
    items: Joi.array()
        .items({
            product: Joi.string().required(),
            color: Joi.string().required(),
            size: Joi.string().required(),
            unitPrice: Joi.number().positive().required(),
            quantity: Joi.number().integer().positive().required(),
        })
        .required(),
    status: Joi.string().valid(
        "placed",
        "confirmed",
        "shipped",
        "in_delivery",
        "delivered",
        "cancelled"
    ),
    total: Joi.number().positive().required(),
    paymentMethod: Joi.string().required(),
    paymentStatus: Joi.string(),
});

export default schema;
