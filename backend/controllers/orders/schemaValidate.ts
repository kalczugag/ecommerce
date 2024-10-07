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
    subtotal: Joi.number().positive().required(),
    discount: Joi.number().positive(),
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
    deliveryCost: Joi.number().min(0).required(),
    additionalInfo: Joi.string().optional(),
});

export default schema;
