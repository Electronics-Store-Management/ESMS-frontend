import Customer from "@/types/entity/Customer";
import apiInstance from "../apiInstance";

export default async function viewCustomerList({
    queryKey,
}: {
    queryKey: any;
}) {
    const [_key, name] = queryKey;
    const response = await apiInstance.get("/customer", {
        params: { name },
    });

    const customer = response.data as Customer[];

    return customer;
}

export async function findCustomer({ queryKey }: { queryKey: any }) {
    const [_key, method, value] = queryKey;

    const response = await apiInstance.get("/customer", {
        params: { [method]: value },
    });

    const customer = response.data as Customer[];

    return customer;
}
