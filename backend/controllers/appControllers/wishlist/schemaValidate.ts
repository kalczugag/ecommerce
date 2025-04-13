import Joi from "joi";

const schema = Joi.object({
    _user: Joi.string().required(),
    products: Joi.array().items(Joi.string()).required(),
});

export default schema;
