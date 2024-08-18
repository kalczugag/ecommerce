import { createOrder } from "./create";
import { getAllOrders } from "./read";
import { getOrderById } from "./readById";

const methods = {
    read: getAllOrders,
    readById: getOrderById,
    create: createOrder,
};

export default methods;
