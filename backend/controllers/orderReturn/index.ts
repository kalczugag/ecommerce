import { createReturn } from "./create";
import { getAllReturns } from "./read";
import { getReturnById } from "./readById";
import { updateReturn } from "./update";

const methods = {
    read: getAllReturns,
    readById: getReturnById,
    create: createReturn,
    update: updateReturn,
};

export default methods;
