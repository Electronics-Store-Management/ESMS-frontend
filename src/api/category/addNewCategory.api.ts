import apiInstance from "../apiInstance";

export default async function addNewCategory(category: NewCategory) {
    apiInstance.defaults.headers.common["Content-Type"] = "multipart/form-data";
    const response = await apiInstance.post("/category", category, {});
    apiInstance.defaults.headers.common["Content-Type"] = "application/json";

    return response.data;
}

export type NewCategory = {
    name: string;
};

