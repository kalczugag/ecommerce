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
    paymentMethod: Joi.string().valid("cash", "stripe", "paypal"),
    paymentStatus: Joi.string().valid(
        "unpaid",
        "paid",
        "failed",
        "refunded",
        "completed",
        "canceled"
    ),
    deliveryMethod: Joi.string().valid("pickup", "delivery"),
    deliveryCost: Joi.number().positive().required(),
    additionalInfo: Joi.string().min(10).optional(),
});

export default schema;
