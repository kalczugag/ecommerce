import type { Role } from "./Role";
import type { ShippingAddress } from "./Order";

export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    _role: Role | string;
    birthday?: Date;
    address?: ShippingAddress;
    password?: string;
    phone?: string;
    email: string;
}
