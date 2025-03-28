import type { Product } from "./Product";
import type { User } from "./User";

export interface Review {
    _id?: string;
    _product: Product | string;
    _user: User;
    value: number;
    message: string;
}

export interface AddReview extends Omit<Review, "_user"> {}

export interface PaginatedReviews extends ParsedQs {
    skip: number;
    limit: number;
}
