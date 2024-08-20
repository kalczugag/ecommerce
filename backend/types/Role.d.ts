type Permission = "create" | "read" | "update" | "delete";

export interface Role {
    name: string;
    permissions: Permission[];
}
