import type { ParsedQs } from "qs";
import type { Cart } from "./Cart";
import type { ShippingAddress } from "./Order";
import type { Role } from "./Role";
import type { Wishlist } from "./Wishlist";

export interface Locale {
    is_eu?: boolean;
    country_name: string;
    country_code?: string;
    continent_name?: string;
    continent_code?: string;
    calling_code?: string;
    languages?: {
        name: string;
        native: string;
        code: string;
    }[];
    currency: {
        name: string;
        code: string;
        symbol: string;
        native: string;
        plural: string;
    };
    time_zone: string;
}

export interface User {
    _id?: string;
    _cart: string | Cart;
    _wishlist: string | Wishlist;
    _role: Role | string;
    firstName: string;
    lastName: string;
    preferences: "men" | "women" | "unisex" | "kids" | "all";
    locale: Locale;
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
