import { createOrder } from "./create";
import { getAllOrders } from "./read";
import { getOrderById } from "./readById";
import { updateOrder } from "./update";
import { summary } from "./summary";

const methods = {
    read: getAllOrders,
    readById: getOrderById,
    create: createOrder,
    update: updateOrder,
    summary,
};

export default methods;
