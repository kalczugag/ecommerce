import Queue from "bull";
import { DailySummaryModel } from "../models/Analytics/DailySummary";
import { ProductDailySummaryModel } from "../models/Analytics/ProductDailySummary";

const eventQueue = new Queue("event_processing", process.env.REDIS_URL!);

eventQueue.process(async (job) => {
    try {
        const doc = job.data;
        const eventDate = new Date(doc.timestamp);
        const dateOnly = new Date(
            Date.UTC(
                eventDate.getUTCFullYear(),
                eventDate.getUTCMonth(),
                eventDate.getUTCDate()
            )
        );

        if (doc.eventType === "product_view") {
            await ProductDailySummaryModel.findOneAndUpdate(
                { date: dateOnly, _product: doc.metadata._product },
                {
                    $setOnInsert: {
                        date: dateOnly,
                        _product: doc.metadata._product,
                    },
                    $inc: { views: 1 },
                },
                { upsert: true, new: true }
            );
            return;
        }

        if (
            doc.eventType === "order" &&
            Array.isArray(doc.metadata?.products)
        ) {
            const bulkOperations = doc.metadata.products.map(
                (product: { _product: string; quantity: number }) => ({
                    updateOne: {
                        filter: { date: dateOnly, _product: product._product },
                        update: {
                            $inc: {
                                sales: product.quantity || 0,
                                orders: 1,
                            },
                        },
                        upsert: true,
                    },
                })
            );

            if (bulkOperations.length > 0) {
                await ProductDailySummaryModel.bulkWrite(bulkOperations);
            }
        }

        const dailyUpdate: Record<string, any> = {
            $setOnInsert: { date: dateOnly },
            $inc: {
                pageViews: doc.eventType === "page_view" ? 1 : 0,
                orders: doc.eventType === "order" ? 1 : 0,
                sales:
                    doc.eventType === "order"
                        ? doc.metadata.amountTotal || 0
                        : 0,
                earnings:
                    doc.eventType === "order"
                        ? doc.metadata.amountTotal || 0
                        : 0,
                uniqueUsers: ["log_in", "sign_up"].includes(doc.eventType)
                    ? 1
                    : 0,
            },
        };

        if (doc.eventType === "session_start") {
            const referrerType =
                doc.metadata.referrer === "direct"
                    ? "direct"
                    : doc.metadata.referrer === "organic"
                    ? "organic"
                    : "referral";

            dailyUpdate.$inc[`sessions.${referrerType}`] = 1;
        }

        await DailySummaryModel.findOneAndUpdate(
            { date: dateOnly },
            dailyUpdate,
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error("Error processing event:", error);
    }
});

eventQueue.on("failed", (job, err) => {
    console.error(`Job failed: ${job.id}`, err);
});

export const enqueueEventProcessing = (doc: any) => eventQueue.add(doc);
