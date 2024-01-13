import apiInstance from "../apiInstance";

export default async function removePermission(id: string) {
    const response = await apiInstance.delete(`/permission/${id}`);

    return response.data;
}
