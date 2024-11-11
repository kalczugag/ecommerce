import type { Cart } from "./Cart";
import type { Role } from "./Role";

export interface Address {
    street: string;
    apartment?: string;
    city: string;
    state?: string;
    postalCode: number;
    country: string;
}

export interface User {
    _id?: string;
    _cart: string | Cart;
    firstName: string;
    lastName: string;
    role: Role;
    birthday?: Date;
    address?: Address;
    phone?: string;
    email: string;
    refreshToken: {
        token: string;
        expires: string;
    };
    hash: string;
    salt: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpdateUser {
    _id: string;
    address: Address;
}
