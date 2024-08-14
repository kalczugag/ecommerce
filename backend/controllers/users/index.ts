import { getAllUsers } from "./read";
import { getUsersByRole } from "./readByRole";
import { updateUser } from "./update";

const methods = {
    read: getAllUsers,
    readByRole: getUsersByRole,
    update: updateUser,
};

export default methods;
