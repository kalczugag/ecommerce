import { createOrder } from "./create";
import { getAllOrders } from "./read";
import { getOrderById } from "./readById";
import { getOrdersByUserId } from "./readByUserId";
import { updateOrder } from "./update";
import { deleteOrder } from "./delete";
import { summary } from "./summary";
import { updateToCron } from "./updateToCron";

const methods = {
    read: getAllOrders,
    readById: getOrderById,
    readByUserId: getOrdersByUserId,
    create: createOrder,
    update: updateOrder,
    updateToCron,
    delete: deleteOrder,
    summary,
};

export default methods;
