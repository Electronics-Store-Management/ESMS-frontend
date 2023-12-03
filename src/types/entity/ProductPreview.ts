import BaseEntity from "./BaseEntity";

export default interface ProductPreview extends BaseEntity {
    name: string;
    unit: string;
    price: number;
    quantity: number;
    warrantyPeriod: number;
    isAvailable: boolean;
    photoURL: string;
    category?: string;
}
