import apiInstance from "../apiInstance";

export default async function viewStaffDetail({
    queryKey,
}: {
    queryKey: any;
}) {
    const [_key, id] = queryKey;
    const response = await apiInstance.get(`/staff/${id}`, {});

    return response.data;
}