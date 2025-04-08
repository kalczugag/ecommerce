import type { Product } from "./Product";
import type { User } from "./User";
import type { Order } from "./Order";

export interface Review {
    _id?: string;
    _product: Product | string;
    _order: Order | string;
    _user: User;
    value: number;
    pros?: string[];
    cons?: string[];
    message?: string;
}

export interface AddReview extends Omit<Review, "_user"> {}

export interface PaginatedReviews extends ParsedQs {
    skip: number;
    limit: number;
}
