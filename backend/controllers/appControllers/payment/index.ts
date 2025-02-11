import { createCheckoutSession } from "./create";
import { stripeWebhook } from "./webhook";

const methods = {
    create: createCheckoutSession,
    webhook: stripeWebhook,
};

export default methods;
