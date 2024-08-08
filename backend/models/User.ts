import mongoose, { Schema } from "mongoose";
import type { User } from "@/types/User";

const userSchema = new mongoose.Schema<User>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: false,
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
        hash: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
