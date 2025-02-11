import { getAllUsers } from "./read";
import { getUserById } from "./readById";
import { getUsersByRole } from "./readByRole";
import { createUser } from "./create";
import { updateUser } from "./update";
import { deleteUser } from "./delete";

const methods = {
    read: getAllUsers,
    readById: getUserById,
    readByRole: getUsersByRole,
    create: createUser,
    update: updateUser,
    delete: deleteUser,
};

export default methods;
