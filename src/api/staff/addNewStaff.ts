import apiInstance from "../apiInstance";

export default async function addNewStaff(staff: NewStaff) {
    const response = await apiInstance.post("/staff", staff);

    return response.data;
}

export type NewStaff = {
    id?: string;
    name: string;
    phone: string;
    email: string;
    citizenId: string;
    role?: string;
};
