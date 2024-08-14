import { getAllUsers } from "./read";
import { getUserById } from "./readById";
import { getUsersByRole } from "./readByRole";
import { updateUser } from "./update";

const methods = {
    read: getAllUsers,
    readById: getUserById,
    readByRole: getUsersByRole,
    update: updateUser,
};

export default methods;
