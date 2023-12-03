import BaseEntity from "./BaseEntity";

export default interface Supplier extends BaseEntity {
    name: string;
    note: string;
    phone: string;
    email: string;
    address: string;
}
