import Joi from "joi";

const schema = Joi.object({
    _order: Joi.string().required(),
    _user: Joi.string().required(),
    returnedItems: Joi.array().items(Joi.string()).required(),
    returnReason: Joi.string().required(),
    returnStatus: Joi.string().valid(
        "initiated",
        "approved",
        "rejected",
        "completed"
    ),
    refundAmount: Joi.number().positive().required(),
    refundMethod: Joi.string().valid("credit_card", "paypal", "bank_transfer"),
});

export default schema;
