import { createProduct } from "./create";
import { deleteProduct } from "./delete";
import { getAllProducts } from "./read";
import { getProductById } from "./readById";
import { getFeaturedProducts } from "./readFeatured";
import { getFilters } from "./readFilters";
import { updateProduct } from "./update";

const methods = {
    read: getAllProducts,
    readById: getProductById,
    readFilters: getFilters,
    readFeatured: getFeaturedProducts,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
};

export default methods;
