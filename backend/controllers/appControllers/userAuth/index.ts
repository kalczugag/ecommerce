import { login } from "./login";
import { register } from "./register";
import { refreshToken } from "./refreshToken";
import { logout } from "./logout";
import { getCurrentUser } from "./readCurrentUser";

const methods = {
    login,
    register,
    logout,
    refreshToken,
    readCurrentUser: getCurrentUser,
};

export default methods;
