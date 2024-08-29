import { createCategory } from "./create";
import { deleteCategory } from "./delete";
import { getAllCategories } from "./read";
import { getCategoryById } from "./readById";
import { getChildrens } from "./readChildrens";

const methods = {
    read: getAllCategories,
    readById: getCategoryById,
    readChildrens: getChildrens,
    create: createCategory,
    delete: deleteCategory,
};

export default methods;
