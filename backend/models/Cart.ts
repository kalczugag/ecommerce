import mongoose from "mongoose";
import type { Cart } from "@/types/Cart";
import { itemSchema } from "./Order";

const cartSchema = new mongoose.Schema<Cart>({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    _products: [itemSchema],
    subTotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    deliveryCost: { type: Number, required: true },
    total: { type: Number, default: 0 },
});

cartSchema.pre("save", function (next) {
    const cart = this as Cart;

    cart.subTotal = cart._products.reduce((acc, item) => {
        return acc + item.unitPrice * item.quantity;
    }, 0);

    cart.total = cart.subTotal - cart.discount + cart.deliveryCost;

    next();
});

export const CartModel = mongoose.model("Cart", cartSchema);
