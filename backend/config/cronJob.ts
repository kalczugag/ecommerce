import { updateSummaryStatistics } from "@/settings/tasks";

export const summaryCronJob = () => {
    updateSummaryStatistics().catch((error) => {
        console.error("Error executing summary cron job:", error);
    });
};
