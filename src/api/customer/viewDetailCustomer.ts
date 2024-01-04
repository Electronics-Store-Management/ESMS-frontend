import Customer from "@/types/entity/Customer";
import apiInstance from "../apiInstance";

export default async function viewDetailCustomer({
    queryKey,
}: {
    queryKey: any;
}): Promise<Customer> {
    const [_key, id] = queryKey;
    const response = await apiInstance.get(`/customer/${id}`, {});

    return response.data;
}
