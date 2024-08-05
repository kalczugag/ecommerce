import bcrypt from "bcrypt";

/**
 * Hashes a plain text password.
 * @param {string} password - The plain text password.
 * @returns {Promise<string>} - The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        throw new Error("Error hashing password");
    }
};

/**
 * Compares a plain text password with a hashed password.
 * @param {string} password - The plain text password.
 * @param {string} hashedPassword - The hashed password.
 * @returns {Promise<boolean>} - True if passwords match, false otherwise.
 */
export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (err) {
        throw new Error("Error comparing passwords");
    }
};
