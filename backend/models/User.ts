import mongoose from "mongoose";
import type { UserProps } from "../types/User";

const userSchema = new mongoose.Schema<UserProps>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
        type: String,
        required: false,
        default: "read",
    },
    gender: { type: String, required: true },
    birthday: { type: Date, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    postalCode: { type: Number, required: false },
    country: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
});

export const User = mongoose.model("User", userSchema);
