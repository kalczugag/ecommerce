export interface Review {
    _id?: string;
    _product: string;
    _user: string;
    value: number;
    reviewMessage: string;
}

export interface ShortReviewsCount {
    count: number;
    value: number;
}
