import Joi from "joi";
import { shippingAddressSchema } from "../../../controllers/appControllers/orders/schemaValidate";

const schema = Joi.object({
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

export default schema;
