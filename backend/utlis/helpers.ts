import crypto from "crypto";
import jwt from "jsonwebtoken";
import { UserProps } from "@/types/User";

/**
 * Validates a password by comparing it with a hash and a salt.
 *
 * @param password - The password to be validated.
 * @param hash - The hashed password.
 * @param salt - The salt used to hash the password.
 * @returns Returns true if the password is valid, false otherwise.
 */
export const validPassword = (password: string, hash: string, salt: string) => {
    const hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
    return hash === hashVerify;
};

/**
 * Generates a salt and a hashed password using the given password.
 *
 * @param password - The password to be hashed.
 * @returns An object containing the generated salt and the hashed password.
 */
export const genPassword = (password: string) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const genHash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");

    return {
        salt: salt,
        hash: genHash,
    };
};

/**
 * Generates a JSON Web Token (JWT) for the given user.
 *
 * @param {UserProps} user - The user object containing the user's ID.
 * @return {{token: string, expires: string}} - An object containing the generated JWT and its expiration time.
 */
export const issueJWT = (user: UserProps) => {
    const _id = user._id;

    const expiresIn = "1d";

    const payload = {
        sub: _id,
        iat: Date.now(),
    };

    const signedToken = jwt.sign(payload, process.env.PRIVATE_KEY!, {
        expiresIn,
        algorithm: "RS256",
    });

    return {
        token: `Bearer ${signedToken}`,
        expires: expiresIn,
    };
};
