import BaseEntity from "./BaseEntity";
import Product from "./Product";

export interface ImportProduct {
    productId: string;
    quantity: number;
    price: number;
}

export interface ImportProductResponse {
    product: Product;
    quantity: number;
    price: number;
}

export default interface ImportBill<T> extends BaseEntity {
    note?: string;
    staffId?: string;
    supplierId?: string;
    paymentMethod: string;
    importProducts: T[];
}
