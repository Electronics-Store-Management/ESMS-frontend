import BaseEntity from "./BaseEntity";

export default interface Staff extends BaseEntity {
    name: string;
    phone: string;
    email: string;
    role: "ADMIN" | "STAFF";
    lastOnline: string;
    citizenId: string;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    enabled: boolean;
}
