import type { ParsedQs } from "qs";
import type { Cart } from "./Cart";
import type { ShippingAddress } from "./Order";
import type { Role } from "./Role";
import type { Wishlist } from "./Wishlist";

interface Locale {
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

interface CountryOption {
    code: string;
    label: string;
    phone: string;
}

interface UserAddress {
    street1: string;
    street2: string;
    city: string;
    region?: string;
    postalCode: string;
    country: CountryOption;
    raw?: string;
}

interface PhoneNumber {
    countryCallingCode: string;
    nationalNumber: string;
    extension?: string;
    raw?: string;
}

interface User {
    _id?: string;
    _cart: string | Cart;
    _wishlist: string | Wishlist;
    _role: Role | string;
    avatar?: {
        url: string;
        imageId: string;
    };
    firstName: string;
    lastName: string;
    preferences: "men" | "women" | "unisex" | "kids" | "all";
    locale: Locale;
    birthday?: Date;
    address?: UserAddress;
    phone?: PhoneNumber;
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

interface PaginatedUsers extends ParsedQs {
    roleName?: string;
    page: number;
    pageSize: number;
}

export {
    User,
    Locale,
    PaginatedUsers,
    CountryOption,
    UserAddress,
    PhoneNumber,
};
