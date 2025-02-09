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
    _deliveryMethod: Joi.string(),
    refundPayments: Joi.array().items(Joi.string()).optional(),
    refundNotes: Joi.array().items(Joi.string()).optional(),
});

export default schema;
