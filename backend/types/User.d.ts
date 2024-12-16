import type { Cart } from "./Cart";
import type { ShippingAddress } from "./Order";
import type { Role } from "./Role";
import type { ParsedQs } from "qs";

export interface User {
    _id?: string;
    _cart: string | Cart;
    _role: Role | string;
    firstName: string;
    lastName: string;
    preferences: "men" | "women" | "unisex" | "kids" | "all";
    birthday?: Date;
    address?: ShippingAddress;
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
