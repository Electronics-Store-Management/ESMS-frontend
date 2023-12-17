import BaseEntity from "./BaseEntity";

export default interface ImportBill extends BaseEntity {
    isStopped: boolean;
    note?: string;
    staffId: string;
    supplierId?: string;
    paymentMethod: string;
}

