import Joi from "joi";

const schema = Joi.object({
    text: Joi.string().min(2).required(),
    private: Joi.boolean().optional(),
    belongsTo: Joi.object({
        _entity: Joi.string().required(),
        model: Joi.string()
            .valid("Order", "Payment", "Shipment", "Return")
            .required(),
    }),
});

export default schema;
