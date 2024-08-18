export interface Order {
    _id?: string;
    _user: string;
    items: {
        _id: string;
        quantity: number;
    }[];
    status?: string;
    total: number;
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: number;
        country: string;
    };
    paymentMethod: string;
    paymentStatus?: string;
}
