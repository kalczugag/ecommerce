import Joi from "joi";

const itemSchema = Joi.object({
    _order: Joi.string().required(),
    _product: Joi.string().required(),
    name: Joi.string().required(),
    sku: Joi.string().optional(),
    color: Joi.string().optional(),
    size: Joi.string().optional(),
    unitPrice: Joi.number().positive().required(),
    quantity: Joi.number().integer().positive().required(),
    total: Joi.number().positive().required(),
});

const shippingAddressSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
});

const schema = Joi.object({
    _user: Joi.string().required(),
    items: Joi.array().items(itemSchema).required(),
    status: Joi.string().valid(
        "placed",
        "confirmed",
        "shipped",
        "delivered",
        "canceled"
    ),
    shippingAddress: shippingAddressSchema,
    billingAddress: shippingAddressSchema,
    subTotal: Joi.number().positive().required(),
    tax: Joi.number().min(0).max(100).required(),
    discount: Joi.number().min(0).max(100),
    deliveryCost: Joi.number().min(0).required(),
    total: Joi.number().positive().required(),
    _payment: Joi.string().required(),
    trackingNumber: Joi.string().optional(),
    shippingMethod: Joi.string().valid("standard", "express", "same-day"),
    deliveryMethod: Joi.string().valid("pickup", "delivery"),
});

export default schema;
