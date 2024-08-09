import express from "express";
import { RoleModel } from "@/models/Role";
import { UserModel } from "@/models/User";

//only role update for now
export const updateUser = async (
    req: express.Request<{ userId: string }, {}, { roleId: string }>,
    res: express.Response
) => {
    const { userId } = req.params;
    const { roleId } = req.body;

    if (!userId || !roleId) {
        return res
            .status(400)
            .json({ error: "User ID and role ID are required" });
    }

    try {
        const role = await RoleModel.findById(roleId);

        if (!role) {
            return res.status(404).json({ error: "Role not found" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                role: roleId,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res
            .status(200)
            .json({ msg: "User role updated successfully", data: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
