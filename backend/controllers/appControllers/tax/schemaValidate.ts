import Joi from "joi";

const schema = Joi.object({
    region: Joi.string().min(2).required(),
    category: Joi.string().required(),
    taxPercent: Joi.number().min(0).max(100).required(),
});

export default schema;
