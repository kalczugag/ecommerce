import mongoose from "mongoose";
import _ from "lodash";
import { SummaryModel } from "../Summary";
import { getStartOfThisWeek } from "../../utils/helpers";
import type { Order, Item } from "../../types/Order";

const orderSchema = new mongoose.Schema<Order>(
    {
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
        status: {
            type: String,
            enum: [
                "placed",
                "confirmed",
                "shipped",
                "delivered",
                "canceled",
                "returned",
            ],
            default: "placed",
        },
        shippingAddress: {
            street: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            postalCode: { type: String, required: false },
            country: { type: String, required: false },
        },
        billingAddress: {
            street: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            postalCode: { type: String, required: false },
            country: { type: String, required: false },
        },
        subTotal: { type: Number, required: true },
        tax: { type: Number, required: false, default: 0 },
        discount: { type: Number, required: true },
        deliveryCost: { type: Number, required: true },
        total: { type: Number, required: true },
        _payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            required: false,
        },
        trackingNumber: { type: String, required: false },
        shippingMethod: {
            type: String,
            enum: ["standard", "express", "expressPlus"],
            required: false,
        },
        deliveryMethod: {
            type: String,
            enum: ["homeDelivery", "pickupPoint", "inStorePickup"],
            required: false,
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

//not actual
orderSchema.post("save", async (doc) => {
    try {
        // const orderTotal =
        //     doc.subTotal + doc.tax - doc.discount + doc.deliveryCost;
        // const orderDate = new Date(new Date(doc.get("createdAt")));
        // const startOfWeek = getStartOfThisWeek();
        // const totalItems = _.sumBy(doc.items as Item[], "quantity");
        // const summary = await SummaryModel.findOneAndUpdate(
        //     {},
        //     { $setOnInsert: { createdAt: new Date() } },
        //     { upsert: true, new: true }
        // );
        // const isThisWeek = orderDate >= startOfWeek;
        // summary.orders.total += orderTotal;
        // summary.orders.count += 1;
        // summary.orders.itemsCount += totalItems;
        // // if (doc.paymentStatus === "paid") {
        // //     summary.orders.paid += orderTotal;
        // // }
        // if (isThisWeek) {
        //     summary.orders.thisWeek += orderTotal;
        // }
        // await summary.save();
    } catch (error) {
        console.error("Error updating summary after order save:", error);
    }
});

export const OrderModel = mongoose.model("Order", orderSchema);
