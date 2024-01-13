import { CONTENT_TYPE } from "@/constants/contentType";
import Customer from "@/types/entity/Customer";
import apiInstance from "../apiInstance";

export default async function addNewCustomer(
    customer: NewCustomer,
): Promise<Customer> {
    const response = await apiInstance.post("/customer", customer, {
        headers: CONTENT_TYPE.json,
    });

    return response.data;
}

export type NewCustomer = Omit<Partial<Customer>, "id">;
