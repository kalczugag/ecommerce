import Joi from "joi";

const schema = Joi.object({
    _user: Joi.string().required(),
    items: Joi.array()
        .items({
            _id: Joi.string().required(),
            quantity: Joi.number().integer().positive().required(),
        })
        .required(),
    status: Joi.string().valid("pending", "shipped", "delivered", "cancelled"),
    total: Joi.number().positive().required(),
    paymentMethod: Joi.string().required(),
    paymentStatus: Joi.string(),
});

export default schema;
