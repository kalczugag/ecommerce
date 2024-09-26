import { getCartItems } from "./read";
import { updateCart } from "./update";

const methods = {
    read: getCartItems,
    update: updateCart,
};

export default methods;
