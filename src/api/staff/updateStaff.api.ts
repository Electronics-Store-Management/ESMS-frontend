import apiInstance from "../apiInstance";
import { NewStaff } from "./addNewStaff";

export default async function updateStaffAPI(staff: NewStaff) {
    const response = await apiInstance.put(`/staff/${staff.id}`, staff, {});

    return response.data;
}
