import mongoose from "mongoose";
import _ from "lodash";
import { SummaryModel } from "./Summary";
import { getStartOfThisWeek } from "@/utils/helpers";
import type { Order, Item } from "@/types/Order";

const itemSchema = new mongoose.Schema<Item>(
    {
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true,
        },
        color: { type: String, required: true },
        size: { type: String, required: true },
        unitPrice: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema<Order>(
    {
        _user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
        items: { type: [itemSchema], required: true },
        status: { type: String, required: false, default: "placed" },
        total: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        paymentStatus: { type: String, required: false, default: "pending" },
    },
    { timestamps: true }
);

orderSchema.post("save", async (doc) => {
    try {
        const orderTotal = doc.total;
        const orderDate = new Date(new Date(doc.get("createdAt")));
        const startOfWeek = getStartOfThisWeek();

        const totalItems = _.sumBy(doc.items, "quantity");

        const summary = await SummaryModel.findOneAndUpdate(
            {},
            { $setOnInsert: { createdAt: new Date() } },
            { upsert: true, new: true }
        );

        const isThisWeek = orderDate >= startOfWeek;

        summary.orders.total += orderTotal;
        summary.orders.count += 1;
        summary.orders.itemsCount += totalItems;

        if (doc.paymentStatus === "paid") {
            summary.orders.paid += orderTotal;
        }

        if (isThisWeek) {
            summary.orders.thisWeek += orderTotal;
        }

        await summary.save();
    } catch (error) {
        console.error("Error updating summary after order save:", error);
    }
});

export const OrderModel = mongoose.model("Order", orderSchema);
