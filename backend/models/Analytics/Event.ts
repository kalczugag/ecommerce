import mongoose from "mongoose";
import type { Event } from "../../types/Analytics";

const EventSchema = new mongoose.Schema<Event>({
    eventType: { type: String, required: true },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    _session: { type: String, required: true },
    _product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    _category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    metadata: { type: Object },
    timestamp: { type: Date, default: () => new Date() },
});

EventSchema.index({ timestamp: 1 }, { expireAfterSeconds: 604800 });

export const EventModel = mongoose.model("Event", EventSchema);
