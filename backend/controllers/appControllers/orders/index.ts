import { createOrder } from "./create";
import { getOrderById } from "./readById";
import { getOrdersByUserId } from "./readByUserId";
import { updateOrder } from "./update";

const methods = {
    readById: getOrderById,
    readByUserId: getOrdersByUserId,
    create: createOrder,
    update: updateOrder,
};

export default methods;
