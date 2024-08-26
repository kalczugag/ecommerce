import cron from "node-cron";
import { summaryCronJob } from "./cronJob";

cron.schedule("0 0 * * *", () => summaryCronJob);
