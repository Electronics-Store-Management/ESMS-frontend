import BaseEntity from "./BaseEntity";
import Customer from "./Customer";
import Product from "./Product";
import ProductPreview from "./ProductPreview";

export interface WarrantyProduct extends Partial<ProductPreview> {
    id: string;
    productId: string;
    warrantyContent: string;
    quantity: number;
    note?: string;
}

export interface WarrantyProductResponse {
    product: Product;
    warrantyContent: string;
    quantity: number;
    note: string;
    status: string;
}

export interface WarrantyBillResponse<T> extends BaseEntity {
    note?: string;
    staffId?: string;
    customer?: Customer;
    warrantyDate?: number;
    warrantyProducts: T[];
}

export default interface WarrantyBill<T> extends BaseEntity {
    note?: string;
    staffId?: string;
    customerId?: string;
    warrantyProducts: T[];
}
