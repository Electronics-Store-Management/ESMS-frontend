import apiInstance from "../apiInstance";

export default async function addNewCategory(category: NewCategory) {
    const response = await apiInstance.post("/category", category, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

export type NewCategory = {
    name: string;
};

