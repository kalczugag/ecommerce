import { getAllTaxes } from "./read";
import { createTax } from "./create";
import { deleteTax } from "./delete";
import { updateTax } from "./update";
import { getTaxById } from "./readById";

const methods = {
    read: getAllTaxes,
    readById: getTaxById,
    create: createTax,
    delete: deleteTax,
    update: updateTax,
};

export default methods;
