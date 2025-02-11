import { getAllRoles } from "./read";
import { createRole } from "./create";

const methods = {
    read: getAllRoles,
    create: createRole,
};

export default methods;
