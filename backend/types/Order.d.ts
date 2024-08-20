import { User } from "./User";

export interface Order {
    _id?: string;
    _user: User;
    items: {
        _id: string;
        quantity: number;
    }[];
    status?: string;
    total: number;
    paymentMethod: string;
    paymentStatus?: string;
}
