import type { Role } from "./Role";
import type { ShippingAddress } from "./Order";

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
}

interface User {
    _id?: string;
    firstName: string;
    avatar?: {
        url: string;
        imageId: string;
    };
    lastName: string;
    _role: Role | string;
    birthday?: Date;
    address?: UserAddress;
    password?: string;
    phone?: PhoneNumber;
    email: string;
}

export { User, UserAddress, PhoneNumber, CountryOption };
