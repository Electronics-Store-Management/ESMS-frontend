import apiInstance from "../apiInstance";

export default async function viewDetailCategory({
    queryKey,
}: {
    queryKey: any;
}) {
    const [_key, id] = queryKey;
    const response = await apiInstance.get(`/category/${id}`, {});

    return response.data;
}
