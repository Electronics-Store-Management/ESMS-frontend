import BaseEntity from "./BaseEntity";
import Product from "./Product";

export interface SaleProduct {
    productId: string;
    quantity: number;
    price: number;
}

export interface SaleProductResponse {
    product: Product;
    quantity: number;
    price: number;
}

export default interface SaleBill<T> extends BaseEntity {
    note?: string;
    staffId?: string;
    customerId?: string;
    paymentMethod: string;
    saleProducts: T[];
}
