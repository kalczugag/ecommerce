import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().min(2).required(),
    permissions: Joi.array()
        .items(Joi.string().valid("create", "read", "update", "delete"))
        .required()
        .unique(),
});

export default schema;
