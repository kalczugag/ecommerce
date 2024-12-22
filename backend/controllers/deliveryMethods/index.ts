import { getAllDeliveryMethods } from "./read";
import { createDeliveryMethod } from "./create";
import { updateDeliveryMethod } from "./update";

const methods = {
    read: getAllDeliveryMethods,
    create: createDeliveryMethod,
    update: updateDeliveryMethod,
};

export default methods;
