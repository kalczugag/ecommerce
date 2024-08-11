import { Role } from "@/models/Role";

export type Permission = "create" | "read" | "update" | "delete";

export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    role: Role | null;
    birthday?: Date;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: Number;
    country?: string;
    phone?: string;
    email: string;
    hash: string;
    salt: string;
}
