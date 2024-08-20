import mongoose from "mongoose";
import type { User } from "@/types/User";

const addressSchema = new mongoose.Schema(
    {
        street: { type: String, required: false },
        apartment: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        postalCode: { type: String, required: false },
        country: { type: String, required: false },
    },
    { _id: false }
);

const userSchema = new mongoose.Schema<User>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: false,
        },
        birthday: { type: Date, required: false },
        address: { type: addressSchema, required: false },
        phone: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        hash: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
