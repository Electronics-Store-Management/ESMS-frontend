import Staff from "@/types/entity/Staff";
import apiInstance from "../apiInstance";

export default async function viewStaffList({ queryKey }: { queryKey: any }) {
    const [_key, name] = queryKey;
    const response = await apiInstance.get("/staff", {
        params: { name },
    });

    const staffs = response.data as Staff[];

    return staffs;
}
