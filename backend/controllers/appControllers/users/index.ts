import { getUserById } from "./readById";
import { getUsersByRole } from "./readByRole";
import { updateUser } from "./update";

const methods = {
    readById: getUserById,
    readByRole: getUsersByRole,
    update: updateUser,
};

export default methods;
