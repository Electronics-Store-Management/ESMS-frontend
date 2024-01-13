import { CONTENT_TYPE } from "@/constants/contentType";
import Customer from "@/types/entity/Customer";
import apiInstance from "../apiInstance";

export default async function updateCustomerAPI(customer: Customer) {
    const response = await apiInstance.put(
        `/customer/${customer.id}`,
        customer,
        {
            headers: CONTENT_TYPE.formData,
        },
    );

    return response.data;
}
