import Joi from "joi";

const shippingAddressSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
}).optional();

const shipmentSchema = Joi.object({
    _order: Joi.string().required(),
    shipFrom: shippingAddressSchema,
    shipTo: shippingAddressSchema,
    status: Joi.string().valid("pending", "shipped", "delivered"),
    _deliveryMethod: Joi.string().required(),
    itemsDelivered: Joi.number().integer().min(0).max(100),
    actualDeliveryDate: Joi.date().optional(),
    trackingNumber: Joi.string().optional(),
    shippingCost: Joi.number().required(),
    deliverySignature: Joi.boolean().optional(),
    _parentShipment: Joi.string().optional(),
    deliveryNotes: Joi.array().items(Joi.string()).optional(),
});

const schema = Joi.object({
    _user: Joi.string().required(),
    items: Joi.array().items(Joi.string()).required(),
    status: Joi.string().valid(
        "placed",
        "confirmed",
        "shipped",
        "delivered",
        "canceled",
        "pending payment",
        "returned"
    ),
    shippingAddress: shippingAddressSchema,
    billingAddress: shippingAddressSchema,
    subTotal: Joi.number().positive().required(),
    tax: Joi.number().min(0).max(100),
    discount: Joi.number().min(0).max(100),
    total: Joi.number().positive().required(),
    payments: Joi.string(),
    shipments: Joi.array().items(shipmentSchema).optional(),
    _parentOrder: Joi.array().items(Joi.string()).optional(),
    splitOrders: Joi.array().items(Joi.string()).optional(),
    orderNotes: Joi.array().items(Joi.string()).optional(),
});

export default schema;
