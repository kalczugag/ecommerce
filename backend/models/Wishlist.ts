import mongoose from "mongoose";
import type { Wishlist } from "../types/Wishlist";

export const wishlistSchema = new mongoose.Schema<Wishlist>({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: false,
        },
    ],
});

export const WishlistModel = mongoose.model("Wishlist", wishlistSchema);
