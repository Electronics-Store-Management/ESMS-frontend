import apiInstance from "../apiInstance";

export default async function viewDetailProduct({
    queryKey,
}: {
    queryKey: any;
}) {
    const [_key, id] = queryKey;
    const response = await apiInstance.get(`/product/${id}`, {});

    return response.data;
}
