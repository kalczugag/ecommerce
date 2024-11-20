export type Permission = "create" | "read" | "update" | "delete";

export interface Role {
    _id?: string;
    name: string;
    permissions: Permission[];
}
