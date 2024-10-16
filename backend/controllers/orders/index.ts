import { createOrder } from "./create";
import { getAllOrders } from "./read";
import { getOrderById } from "./readById";
import { getOrdersByUserId } from "./readByUserId";
import { updateOrder } from "./update";
import { summary } from "./summary";

const methods = {
    read: getAllOrders,
    readById: getOrderById,
    readByUserId: getOrdersByUserId,
    create: createOrder,
    update: updateOrder,
    summary,
};

export default methods;
