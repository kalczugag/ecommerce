import mongoose from "mongoose";
import { ProductModel } from "./Product";
import type { Cart, CartItem } from "../types/Cart";

const cartSchema = new mongoose.Schema<Cart>({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BaseItem",
            required: true,
        },
    ],
    subTotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    deliveryCost: { type: Number, required: true },
    total: { type: Number, default: 0 },
});

cartSchema.pre("save", async function (next) {
    const cart = this as Cart;

    cart.subTotal = 0;
    cart.discount = 0;

    for (const item of cart.items as CartItem[]) {
        const product = await ProductModel.findById(item._product);

        if (!product) continue;

        const itemPrice = product.price * item.quantity;

        if (product.discountPercent) {
            const discountAmount =
                (product.price * product.discountPercent) / 100;
            cart.discount += discountAmount * item.quantity;
        }

        cart.subTotal += itemPrice;
    }

    cart.total = cart.subTotal - cart.discount + cart.deliveryCost;

    if (cart.total < 100) {
        cart.deliveryCost = 5;
    } else {
        cart.deliveryCost = 0;
    }

    next();
});

export const CartModel = mongoose.model("Cart", cartSchema);
