import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(10).optional(),
    parentCategory: Joi.string().optional(),
    level: Joi.string()
        .valid("topLevel", "secondLevel", "thirdLevel")
        .optional(),
});

export default schema;
