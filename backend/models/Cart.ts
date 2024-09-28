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

cartSchema.pre("save", async function (next) {
    const cart = this as Cart;

    cart.subTotal = 0;
    cart.discount = 0;

    for (const item of cart._products) {
        const product = await mongoose.model("Product").findById(item.product);
        if (!product) continue;

        const itemPrice = item.unitPrice * item.quantity;

        if (product.discountPercent) {
            const discountAmount =
                (item.unitPrice * product.discountPercent) / 100;
            cart.discount += discountAmount * item.quantity;
        }

        cart.subTotal += itemPrice;
    }

    cart.total = cart.subTotal - cart.discount + cart.deliveryCost;

    next();
});

export const CartModel = mongoose.model("Cart", cartSchema);
