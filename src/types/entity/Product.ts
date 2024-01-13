import BaseEntity from "./BaseEntity";
import Category from "./Category";

export interface Specification {
    name: string;
    value: string;
    type: string;
}

export default interface Product extends BaseEntity {
    name: string;
    unit: string;
    price: number;
    quantity: number;
    warrantyPeriod: number;
    isAvailable: boolean;
    photoURL: string;
    category?: Category;
    specifications: Specification[];
}
