import { createOrder } from "./create";
import { getAllOrders } from "./read";
import { getOrderById } from "./readById";
import { summary } from "./summary";

const methods = {
    read: getAllOrders,
    readById: getOrderById,
    create: createOrder,
    summary,
};

export default methods;
