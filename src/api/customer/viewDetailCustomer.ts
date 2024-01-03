import Supplier from "@/types/entity/Supplier";
import apiInstance from "../apiInstance";
import Customer from "@/types/entity/Customer";

export default async function viewDetailCustomer({
    queryKey,
}: {
    queryKey: any;
}): Promise<Customer> {
    const [_key, id] = queryKey;
    const response = await apiInstance.get(`/customer/${id}`, {});

    return response.data;
}
