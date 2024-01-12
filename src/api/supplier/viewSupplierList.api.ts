import Supplier from "@/types/entity/Supplier";
import apiInstance from "../apiInstance";

export default async function viewSupplierList({
    queryKey,
}: {
    queryKey: any;
}) {
    const [_key, name] = queryKey;
    const response = await apiInstance.get("/supplier", {
        params: { name },
    });

    const suppliers = response.data as Supplier[];

    return suppliers;
}
