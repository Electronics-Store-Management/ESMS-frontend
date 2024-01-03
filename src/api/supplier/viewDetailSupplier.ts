import Supplier from "@/types/entity/Supplier";
import apiInstance from "../apiInstance";

export default async function viewDetailSupplier({
    queryKey,
}: {
    queryKey: any;
}): Promise<Supplier> {
    const [_key, id] = queryKey;
    const response = await apiInstance.get(`/supplier/${id}`, {});

    return response.data;
}
