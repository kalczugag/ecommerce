import mongoose from "mongoose";
import { SummaryModel } from "./Summary";
import { getStartOfThisWeek } from "@/utils/helpers";
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

const refreshTokenSchema = new mongoose.Schema(
    {
        token: { type: String, required: true },
        expires: { type: String, required: true },
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
        refreshToken: {
            type: refreshTokenSchema,
            required: false,
            select: false,
        },
    },
    { timestamps: true }
);

userSchema.post("save", async (doc) => {
    try {
        const userDate = new Date(new Date(doc.get("createdAt")));
        const startOfWeek = getStartOfThisWeek();

        const summary = await SummaryModel.findOneAndUpdate(
            {},
            { $setOnInsert: { createdAt: new Date() } },
            { upsert: true, new: true }
        );

        summary.users.count += 1;

        const isThisWeek = userDate >= startOfWeek;
        if (isThisWeek) {
            summary.users.thisWeek += 1;
        }

        await summary.save();
    } catch (error) {
        console.error("Error updating summary after user save:", error);
    }
});

export const UserModel = mongoose.model("User", userSchema);
