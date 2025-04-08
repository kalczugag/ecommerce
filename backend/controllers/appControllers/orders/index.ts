import { createOrder } from "./create";
import { deleteOrder } from "./delete";
import { getOrderById } from "./readById";
import { getOrdersByUserId } from "./readByUserId";
import { updateOrder } from "./update";

const methods = {
    readById: getOrderById,
    readByUserId: getOrdersByUserId,
    create: createOrder,
    delete: deleteOrder,
    update: updateOrder,
};

export default methods;
