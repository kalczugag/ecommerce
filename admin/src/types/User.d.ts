import type { Role } from "./Role";

export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    role: Role | string;
    birthday?: Date;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: number;
    country?: string;
    phone?: string;
    email: string;
}
