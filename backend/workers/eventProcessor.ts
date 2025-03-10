import Queue from "bull";
import { DailySummaryModel } from "../models/Analytics/DailySummary";
import { ProductDailySummaryModel } from "../models/Analytics/ProductDailySummary";

const eventQueue = new Queue("event_processing", process.env.REDIS_URL!);

eventQueue.process(async (job) => {
    const doc = job.data;
    const eventDate = new Date(doc.timestamp);
    const dateOnly = new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate()
    );

    const isProductEvent = !!doc.metadata._product;
    const productUpdate: any = {
        $setOnInsert: { date: dateOnly, _product: doc.metadata._product },
    };
    const dailyUpdate: any = { $setOnInsert: { date: dateOnly } };

    if (doc.eventType === "product_view") {
        productUpdate.$inc = { pageViews: 1 };
        await ProductDailySummaryModel.findOneAndUpdate(
            { date: dateOnly, _product: doc.metadata._product },
            productUpdate,
            { upsert: true, new: true }
        );
    }

    if (!isProductEvent) {
        dailyUpdate.$inc = {
            pageViews: doc.eventType === "page_view" ? 1 : 0,
            orders: doc.eventType === "order" ? 1 : 0,
            sales: doc.eventType === "order" ? doc.details.totalAmount || 0 : 0,
            uniqueUsers: ["log_in", "sign_up"].includes(doc.eventType) ? 1 : 0,
        };

        if (doc.eventType === "session_start") {
            let referrerType = "referral";

            if (doc.metadata.referrer === "direct") {
                referrerType = "direct";
            } else if (doc.metadata.referrer === "organic") {
                referrerType = "organic";
            }

            dailyUpdate.$inc[`sessions.${referrerType}`] = 1;
        }

        await DailySummaryModel.findOneAndUpdate(
            { date: dateOnly },
            dailyUpdate,
            { upsert: true, new: true }
        );
    }
});

eventQueue.on("failed", (job, err) => {
    console.error(`Job failed: ${job.id}`, err);
});

export const enqueueEventProcessing = (doc: any) => eventQueue.add(doc);
