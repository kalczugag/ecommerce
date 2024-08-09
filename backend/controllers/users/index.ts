import { getAllUsers } from "./read";
import { updateUser } from "./update";

const methods = {
    read: getAllUsers,
    update: updateUser,
};

export default methods;
