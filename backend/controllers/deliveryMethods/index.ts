import { getAllDeliveryMethods } from "./read";
import { createDeliveryMethod } from "./create";
import { updateDeliveryMethod } from "./update";
import { getDeliveryMethodsByProviderId } from "./readByProviderId";

const methods = {
    read: getAllDeliveryMethods,
    readByProviderId: getDeliveryMethodsByProviderId,
    create: createDeliveryMethod,
    update: updateDeliveryMethod,
};

export default methods;
