import type { Cart } from "./Cart";
import type { Role } from "./Role";
import type { ParsedQs } from "qs";

export interface User {
    _id?: string;
    _cart: string | Cart;
    firstName: string;
    lastName: string;
    preferences: "men" | "women" | "unisex" | "kids" | "all";
    role: Role | string;
    birthday?: Date;
    address?: {
        street: string;
        apartment?: string;
        city: string;
        state?: string;
        postalCode: number;
        country: string;
    };
    phone?: string;
    email: string;
    refreshToken: {
        token: string;
        expires: string;
    };
    hash: string;
    salt: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaginatedUsers extends ParsedQs {
    roleName?: string;
    page: number;
    pageSize: number;
}
