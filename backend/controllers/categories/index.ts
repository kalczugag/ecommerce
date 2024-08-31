import { createCategory } from "./create";
import { deleteCategory } from "./delete";
import { getAllCategories } from "./read";
import { getCategoryById } from "./readById";
import { getCategoryByLevel } from "./readByLevel";
import { getChildrens } from "./readChildrens";
import { updateCategory } from "./update";

const methods = {
    read: getAllCategories,
    readById: getCategoryById,
    readByLevel: getCategoryByLevel,
    readChildrens: getChildrens,
    create: createCategory,
    update: updateCategory,
    delete: deleteCategory,
};

export default methods;
