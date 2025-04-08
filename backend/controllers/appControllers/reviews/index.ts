import { createReview } from "./create";
import { getReviewsByProduct } from "./readByProductId";

const methods = {
    create: createReview,
    readByProductId: getReviewsByProduct,
};

export default methods;
