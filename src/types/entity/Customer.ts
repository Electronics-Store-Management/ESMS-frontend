import BaseEntity from "./BaseEntity";

export default interface Customer extends BaseEntity {
    name: string;
    phone: string;
    address: string;
}
