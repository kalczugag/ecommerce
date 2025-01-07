import type { Cart } from "./Cart";
import type { Role } from "./Role";
import { ShippingAddress } from "./Order";
export interface User {
    _id?: string;
    _cart: string | Cart;
    firstName: string;
    lastName: string;
    role: Role;
    birthday?: Date;
    address?: ShippingAddress;
    phone?: string;
    email: string;
    preferences?: string[];
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UpdateUser {
    _id: string;
    address?: ShippingAddress;
    preferences?: string[];
}
