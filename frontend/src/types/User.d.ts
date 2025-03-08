import type { Cart } from "./Cart";
import type { Role } from "./Role";
import { ShippingAddress } from "./Order";

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
    firstName: string;
    lastName: string;
    role: Role;
    locale: Locale;
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
