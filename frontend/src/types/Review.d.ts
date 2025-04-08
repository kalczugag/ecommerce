export interface Review {
    _id?: string;
    _product: string;
    _order: string;
    _user: string;
    value: number;
    pros?: string[];
    cons?: string[];
    message?: string;
}
