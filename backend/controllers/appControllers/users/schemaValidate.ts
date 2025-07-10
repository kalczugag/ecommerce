import Joi from "joi";
import { userAddressSchema } from "../../../controllers/coreControllers/users/schemaValidate";

const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    birthday: Joi.date().iso().optional(),
    locale: Joi.any().optional(),
    _role: Joi.string().hex().length(24).optional(),
    address: userAddressSchema,
    phone: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export default schema;
