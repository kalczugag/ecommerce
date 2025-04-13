import mongoose from "mongoose";
import { CartModel } from "./Cart";
import type { Locale, User } from "../types/User";
import type { ShippingAddress } from "../types/Order";
import { WishlistModel } from "./Wishlist";

const addressSchema = new mongoose.Schema<ShippingAddress>(
    {
        street: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        postalCode: { type: String, required: false },
        country: { type: String, required: false },
    },
    { _id: false }
);

const userLocaleSchema = new mongoose.Schema<Locale>(
    {
        is_eu: { type: Boolean },
        country_name: { type: String, required: true },
        country_code: { type: String },
        continent_name: { type: String },
        continent_code: { type: String },
        calling_code: { type: String },
        languages: [
            {
                name: { type: String },
                native: { type: String },
                code: { type: String },
            },
        ],
        currency: {
            name: { type: String, required: true },
            code: { type: String, required: true },
            symbol: { type: String, required: true },
            native: { type: String, required: true },
            plural: { type: String, required: true },
        },
        time_zone: { type: String, required: true },
    },
    { _id: false }
);

const refreshTokenSchema = new mongoose.Schema<User["refreshToken"]>(
    {
        token: { type: String, required: true },
        expires: { type: String, required: true },
    },
    { _id: false }
);

const userSchema = new mongoose.Schema<User>(
    {
        _cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
        _wishlist: { type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        preferences: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: false,
            },
        ],
        _role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: false,
        },
        locale: { type: userLocaleSchema, required: false, select: false },
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

userSchema.index({
    firstName: "text",
    lastName: "text",
    email: "text",
    phone: "text",
});

userSchema.post("save", async function (doc) {
    try {
        if (!doc._cart) {
            const newCart = await CartModel.create({
                _user: doc._id,
                items: [],
                subTotal: 0,
                discount: 0,
                deliveryCost: 0,
                total: 0,
            });

            doc._cart = newCart._id;
            await doc.save();
        }

        if (!doc._wishlist) {
            const newWishlist = await WishlistModel.create({
                _user: doc._id,
                products: [],
            });

            doc._wishlist = newWishlist._id;
            await doc.save();
        }
    } catch (error) {
        console.error(
            "Error creating cart or updating summary after user save:",
            error
        );
    }
});

userSchema.pre("findOneAndDelete", async function (next) {
    const cartId = this.getQuery()._cart;

    try {
        await mongoose.model("Cart").findByIdAndDelete(cartId);
        next();
    } catch (error: any) {
        next(error);
    }
});

export const UserModel = mongoose.model("User", userSchema);
