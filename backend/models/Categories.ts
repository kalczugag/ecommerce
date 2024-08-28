import mongoose from "mongoose";
import type { Category } from "@/types/Category";

const categorySchema = new mongoose.Schema<Category>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: false,
        },
        parentCategory: {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
            default: null,
        },
        level: {
            type: String,
            enum: ["topLevel", "secondLevel", "thirdLevel"],
            default: "topLevel",
        },
    },
    { timestamps: true }
);

categorySchema.pre("save", async function (next) {
    try {
        if (!this.parentCategory) {
            this.level = "topLevel";
        } else {
            const parent = await mongoose
                .model<Category>("Category")
                .findById(this.parentCategory);
            if (parent) {
                if (parent.level === "topLevel") {
                    this.level = "secondLevel";
                } else if (parent.level === "secondLevel") {
                    this.level = "thirdLevel";
                }
            }
        }
        next();
    } catch (error: any) {
        console.error("Error saving category:", error);
        next(error);
    }
});

export const CategoryModel = mongoose.model("Category", categorySchema);
