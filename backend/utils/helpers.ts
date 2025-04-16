import crypto from "crypto";
import jwt from "jsonwebtoken";
import moment from "moment";
import type { User } from "../types/User";

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
 * @param {User} user - The user object containing the user's ID.
 * @return {{token: string, expires: string}} - An object containing the generated JWT and its expiration time.
 */
export const issueJWT = (user: User, type: "access" | "refresh") => {
    const _id = user._id;
    const expiresIn = type === "access" ? "15m" : "7d";

    const secret =
        type === "access"
            ? process.env.PRIVATE_KEY!
            : process.env.REFRESH_TOKEN!;

    const payload = {
        sub: _id,
        iat: Date.now(),
        type,
    };

    const signedToken = jwt.sign(payload, secret, {
        expiresIn,
        algorithm: "RS256",
    });

    return {
        token: `Bearer ${signedToken}`,
        expires: expiresIn,
    };
};

/**
 * Returns the date of the start of the week (Monday at 00:00:00).
 *
 * @return {Date} The start of the week.
 */
export const getStartOfThisWeek = () => {
    const startOfWeek = moment().startOf("week").toDate();
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
};

export const getStartOfThisMonth = (): Date => {
    const startOfMonth = moment().startOf("month").toDate();
    startOfMonth.setHours(0, 0, 0, 0);
    return startOfMonth;
};

export const getStartOfThisYear = (): Date => {
    const startOfYear = moment().startOf("year").toDate();
    startOfYear.setHours(0, 0, 0, 0);
    return startOfYear;
};
