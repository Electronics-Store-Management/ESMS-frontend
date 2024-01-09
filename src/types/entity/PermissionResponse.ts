import Staff from "./Staff";

export const PermissionTypeList: PermissionType[] = [
    "CREATE",
    "VIEW_ITEM",
    "VIEW_ALL",
    "UPDATE_ITEM",
    "UPDATE_ALL",
    "DELETE_ITEM",
    "DELETE_ALL",
];

export const EntityTypeList: EntityType[] = [
    "PRODUCT",
    "CATEGORY",
    "CUSTOMER",
    "SUPPLIER",
    "STAFF",
    "IMPORT_BILL",
    "SALE_BILL",
    "WARRANTY_BILL",
    "DASHBOARD",
];

export type PermissionType =
    | "CREATE"
    | "VIEW_ITEM"
    | "VIEW_ALL"
    | "UPDATE_ITEM"
    | "UPDATE_ALL"
    | "DELETE_ITEM"
    | "DELETE_ALL";

export type EntityType =
    | "PRODUCT"
    | "CATEGORY"
    | "CUSTOMER"
    | "SUPPLIER"
    | "STAFF"
    | "IMPORT_BILL"
    | "SALE_BILL"
    | "WARRANTY_BILL"
    | "DASHBOARD";

export interface PermissionBase {
    permissionType: PermissionType;
    entityType: EntityType;
    entityId?: string | null;
}

export interface Permission extends PermissionBase {
    staffId: string;
}

export interface PermissionResponse extends PermissionBase {
    id: string;
    staff: Staff;
}

export interface Authority {
    authority: string;
}

export default interface StaffPermissinResponse {
    permissions: PermissionResponse[];
    authorities: Authority[];
}
