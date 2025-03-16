import Joi from "joi";
import _ from "lodash";

const schema = Joi.object({
    eventType: Joi.string().min(2).required(),
    _session: Joi.string().required(),
    _user: Joi.string().optional(),
    _product: Joi.string().optional(),
    _category: Joi.string().optional(),
    metadata: Joi.any().optional(),
    timestamp: Joi.date().iso().required(),
});

export default schema;
