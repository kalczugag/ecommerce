import Joi from "joi";

const providerSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().min(0).required(),
    estimatedDeliveryTimeMin: Joi.number().required(),
    estimatedDeliveryTimeMax: Joi.number().required(),
    trackingUrl: Joi.string().optional(),
    additionalNotes: Joi.any().optional(),
    isAvailable: Joi.boolean().optional(),
});

const schema = Joi.object({
    type: Joi.string()
        .valid(
            "home_delivery",
            "locker_delivery",
            "pickup",
            "unavailable_for_customers"
        )
        .required(),
    providers: Joi.array().items(providerSchema).required(),
    metadata: Joi.any().optional(),
});

export default schema;
