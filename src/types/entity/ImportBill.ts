import BaseEntity from "./BaseEntity";
import ProductPreview from "./ProductPreview";

export interface ImportProduct extends ProductPreview {
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
