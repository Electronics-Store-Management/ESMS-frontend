import BaseEntity from "./BaseEntity";
import Customer from "./Customer";
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

export interface SaleBillResponse<T> extends BaseEntity {
    note?: string;
    staffId?: string;
    customer?: Customer;
    paymentMethod: string;
    saleProducts: T[];
}

export default interface SaleBill<T> extends BaseEntity {
    note?: string;
    staffId?: string;
    customerId?: string;
    paymentMethod: string;
    saleProducts: T[];
}
