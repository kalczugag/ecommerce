import Queue from "bull";
import { DailySummaryModel } from "../models/Analytics/DailySummary";
import { ProductDailySummaryModel } from "../models/Analytics/ProductDailySummary";
import { SummaryByCountryModel } from "../models/Analytics/SummaryByCountry";
import { CampaignsDailySummaryModel } from "../models/Analytics/CampaignDailySummary";

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

        const campaignEvents = [
            "campaign_view",
            "campaign_click",
            "add_discount",
            "remove_discount",
            "campaign_conversion",
            "campaign_email_open",
            "campaign_email_click",
            "campaign_social_share",
            "campaign_created",
            "campaign_updated",
            "campaign_activated",
            "campaign_deactivated",
            "campaign_completed",
            "campaign_scheduled",
        ];
        if (campaignEvents.includes(doc.eventType) && doc.metadata?._campaign) {
            const campaignUpdate: Record<string, any> = {
                $setOnInsert: {
                    date: dateOnly,
                    _campaign: doc.metadata._campaign,
                },
                $inc: { views: 0 },
            };

            if (doc.eventType === "campaign_view") {
                campaignUpdate.$inc.views = 1;
            }

            if (
                doc.eventType === "campaign_created" ||
                doc.eventType === "campaign_updated"
            ) {
                if (doc.metadata.status) {
                    const statusField = doc.metadata.status.toLowerCase();
                    if (
                        [
                            "active",
                            "inactive",
                            "scheduled",
                            "completed",
                        ].includes(statusField)
                    ) {
                        campaignUpdate.$inc[statusField] = 1;
                    }
                }
            }

            if (doc.eventType === "campaign_activated") {
                campaignUpdate.$inc.active = 1;
                if (doc.metadata.previousStatus) {
                    campaignUpdate.$inc[doc.metadata.previousStatus] = -1;
                }
            }

            if (doc.eventType === "campaign_deactivated") {
                campaignUpdate.$inc.inactive = 1;
                if (doc.metadata.previousStatus) {
                    campaignUpdate.$inc[doc.metadata.previousStatus] = -1;
                }
            }

            if (doc.eventType === "campaign_completed") {
                campaignUpdate.$inc.completed = 1;
                if (doc.metadata.previousStatus) {
                    campaignUpdate.$inc[doc.metadata.previousStatus] = -1;
                }
            }

            if (doc.eventType === "campaign_scheduled") {
                campaignUpdate.$inc.scheduled = 1;
                if (doc.metadata.previousStatus) {
                    campaignUpdate.$inc[doc.metadata.previousStatus] = -1;
                }
            }

            if (doc.eventType === "add_discount") {
                campaignUpdate.$inc.discountUses = 1;

                if (doc.metadata.discountValue) {
                    campaignUpdate.$inc.discountValueTotal =
                        doc.metadata.discountValue;
                }
            }

            if (doc.eventType === "campaign_conversion") {
                campaignUpdate.$inc.conversions = 1;

                if (doc.metadata.conversionValue) {
                    campaignUpdate.$inc.conversionValueTotal =
                        doc.metadata.conversionValue;
                }
            }

            if (doc.eventType === "campaign_created") {
                campaignUpdate.$inc.total = 1;
            }

            await CampaignsDailySummaryModel.findOneAndUpdate(
                { date: dateOnly, _campaign: doc.metadata._campaign },
                campaignUpdate,
                { upsert: true, new: true }
            );
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
                eventCount: 1,
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

        if (
            doc.eventType === "sign_up" &&
            doc.metadata.country &&
            doc.metadata.flag
        ) {
            await SummaryByCountryModel.findOneAndUpdate(
                { country: doc.country },
                {
                    $setOnInsert: {
                        country: doc.metadata.country,
                        flag: doc.metadata.flag,
                    },
                    $inc: { count: 1 },
                },
                { upsert: true, new: true }
            );
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
