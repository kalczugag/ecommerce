import mongoose from "mongoose";
import type { Cart } from "../types/Cart";
import { ProductModel } from "./Product";
import { Item } from "../types/Order";

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
    promoCodePercent: { type: Number, default: 0 },
    promoCode: { type: String, default: null },
    deliveryCost: { type: Number, required: false, default: 0 },
    total: { type: Number, default: 0 },
});

cartSchema.pre("save", async function (next) {
    const cart = this as Cart;

    cart.subTotal = 0;
    let productDiscount = 0;
    cart.deliveryCost = 0;

    // if (cart.items.length === 0) cart.promoCodePercent = 0;

    for (const item of cart.items as Item[]) {
        const product = await ProductModel.findById(item._product);

        if (!product) continue;

        const itemPrice = product.price * item.quantity;

        if (product.discountPercent) {
            const discountAmount =
                (product.price * product.discountPercent) / 100;
            productDiscount += discountAmount * item.quantity;
        }

        cart.subTotal += itemPrice;
    }

    const promoDiscount =
        cart.promoCodePercent > 0
            ? (cart.subTotal * cart.promoCodePercent) / 100
            : 0;

    cart.discount = productDiscount + promoDiscount;

    cart.total = cart.subTotal - cart.discount + cart.deliveryCost;

    next();
});

export const CartModel = mongoose.model("Cart", cartSchema);
