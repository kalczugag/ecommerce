import mongoose from "mongoose";
import type { Permission } from "../types/User";

interface RoleProps {
    name: string;
    permissions: Permission[];
}

const roleSchema = new mongoose.Schema<RoleProps>({
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
});

const Role = mongoose.model("Role", roleSchema);
