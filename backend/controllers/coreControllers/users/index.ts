import { getAllUsers } from "./read";
import { createUser } from "./create";
import { deleteUser } from "./delete";

const methods = {
    read: getAllUsers,
    create: createUser,
    delete: deleteUser,
};

export default methods;
