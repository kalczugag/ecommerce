import Joi from "joi";

export const shippingAddressSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
}).optional();

const shipmentSchema = Joi.object({
    _order: Joi.string().required(),
    _user: Joi.string().required(),
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
    orderData: Joi.object({
        _user: Joi.string().required(),
        _cart: Joi.string().required(),
        shippingAddress: shippingAddressSchema,
        billingAddress: shippingAddressSchema,
        notes: Joi.array().items(Joi.string()).optional(),
    }),
    shipmentData: Joi.object({
        shipFrom: shippingAddressSchema,
        shipTo: shippingAddressSchema,
        _deliveryMethod: Joi.string().required(),
        notes: Joi.array().items(Joi.string()).optional(),
    }),
});

export default schema;
