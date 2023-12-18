import BaseEntity from "./BaseEntity";

export default interface ImportProduct {
    productId: string;
    quantity: number;
    price: number;
}

export default interface ImportBill extends BaseEntity {
    note?: string;
    staffId?: string;
    supplierId?: string;
    paymentMethod: string;
    importProducts: ImportProduct[];
}

