import { createProduct } from "./create";
import { deleteProduct } from "./delete";
import { getAllProducts } from "./read";
import { getProductById } from "./readById";
import { updateProduct } from "./update";

const methods = {
    read: getAllProducts,
    readById: getProductById,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
};

export default methods;
