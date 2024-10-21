import mongoose from "mongoose";
import type { Role } from "../types/Role";

const roleSchema = new mongoose.Schema<Role>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        permissions: {
            type: [String],
            enum: ["create", "read", "update", "delete"],
            required: true,
        },
    },
    { timestamps: true }
);

export const RoleModel = mongoose.model("Role", roleSchema);
