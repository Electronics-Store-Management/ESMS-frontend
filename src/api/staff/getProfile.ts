import Staff from "@/types/entity/Staff";
import apiInstance from "../apiInstance";

export default async function viewStaffProfile({
    queryKey,
}: {
    queryKey: any;
}): Promise<Staff> {
    const [_key] = queryKey;
    const response = await apiInstance.get(`/staff/profile`);

    return response.data;
}
