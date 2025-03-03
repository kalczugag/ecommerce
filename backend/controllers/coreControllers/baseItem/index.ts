import { createBaseItem } from "./create";
import { deleteBaseItem } from "./delete";
import { updateBaseItem } from "./update";

const methods = {
    create: createBaseItem,
    update: updateBaseItem,
    delete: deleteBaseItem,
};

export default methods;
