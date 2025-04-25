import mongoose from "mongoose";
import { OrderModel } from "../models/Order";
import { BaseItemModel } from "../models/BaseItem";
import { CounterModel } from "../models/Counter";

export const cleanUpOrders = async () => {
    try {
        const orders = await OrderModel.find();

        const ordersToDelete: mongoose.Types.ObjectId[] = [];

        for (const order of orders) {
            const shouldDelete =
                order.status === "placed" ||
                !order.orderNumber ||
                order.items.length === 0;

            if (shouldDelete) {
                ordersToDelete.push(new mongoose.Types.ObjectId(order._id));
                continue;
            }

            const itemIds = order.items
                .map((id) => {
                    try {
                        return new mongoose.Types.ObjectId(
                            id as unknown as string
                        );
                    } catch {
                        return null;
                    }
                })
                .filter((id): id is mongoose.Types.ObjectId => id !== null);

            const existingBaseItemsCount = await BaseItemModel.countDocuments({
                _id: { $in: itemIds },
            });

            if (existingBaseItemsCount !== order.items.length) {
                ordersToDelete.push(new mongoose.Types.ObjectId(order._id));
            }
        }

        if (ordersToDelete.length > 0) {
            const result = await OrderModel.deleteMany({
                _id: { $in: ordersToDelete },
            });
            console.log(`🗑️ Deleted ${result.deletedCount} invalid orders.`);
        } else {
            console.log("✅ No invalid orders found.");
        }
    } catch (error) {
        console.error("❌ Error cleaning up orders:", error);
    }
};

export const syncOrderNumberCounter = async () => {
    try {
        const latestOrder = await OrderModel.findOne({
            orderNumber: { $ne: null },
        })
            .sort({ orderNumber: -1 })
            .select("orderNumber")
            .lean();

        const maxOrderNumber = latestOrder?.orderNumber || 0;

        const result = await CounterModel.findOneAndUpdate(
            { _id: "orderNumber" },
            { $set: { seq: maxOrderNumber } },
            { upsert: true, new: true }
        );

        console.log(`✅ Counter synced to orderNumber: ${result.seq}`);
    } catch (err) {
        console.error("❌ Failed to sync orderNumber counter:", err);
    }
};
