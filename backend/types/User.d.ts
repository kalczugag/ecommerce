import { Role } from "@/models/Role";

export type Permission = "create" | "read" | "update" | "delete";

export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
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
    hash: string;
    salt: string;
}
