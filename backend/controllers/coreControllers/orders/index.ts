import { getAllOrders } from "./read";
import { summary } from "./summary";
import { updateOrder } from "./update";
import { updateToCron } from "./updateToCron";
import { deleteOrder } from "./delete";
import { deleteOrderItem } from "./deleteItem";

const methods = {
    read: getAllOrders,
    update: updateOrder,
    updateToCron,
    summary,
    delete: deleteOrder,
    deleteItem: deleteOrderItem,
};

export default methods;
